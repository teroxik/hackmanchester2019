import { compose } from 'redux'
import { connect } from 'react-redux'
import { withHandlers, withStateHandlers, setDisplayName } from 'recompose'
import { withRouter } from 'react-router-dom'
import firestoreConnect from 'react-redux-firebase/lib/firestoreConnect'
import { withNotifications } from 'modules/notification'
import { spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'
import { LIST_PATH } from 'constants/paths'

export default compose(
  // Set component display name (more clear in dev/error tools)
  setDisplayName('EnhancedPatientsPage'),
  // redirect to /login if user is not logged in
  UserIsAuthenticated,
  // Map auth uid from state to props
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  // Wait for uid to exist before going further
  spinnerWhileLoading(['uid']),
  // Create listeners based on current users UID
  firestoreConnect(({ uid }) => [
    // Listener for projects the current user created
    {
      collection: 'patients'
      // where: ['createdBy', '==', uid]
    }
  ]),
  // Map projects from state to props
  connect(({ firestore: { ordered } }) => ({
    patients: ordered.patients
  })),
  // Show loading spinner while projects and collabProjects are loading
  spinnerWhileLoading(['patients']),
  // Add props.router
  withRouter,
  // Add props.showError and props.showSuccess
  withNotifications,
  // Add state and state handlers as props
  withStateHandlers(
    // Setup initial state
    ({ initialDialogOpen = false }) => ({
      newDialogOpen: initialDialogOpen
    }),
    // Add state handlers as props
    {
      toggleDialog: ({ newDialogOpen }) => () => ({
        newDialogOpen: !newDialogOpen
      })
    }
  ),
  // Add handlers as props
  withHandlers({
    addPatient: props => newInstance => {
      const { firestore, uid, showError, showSuccess, toggleDialog } = props
      if (!uid) {
        return showError('You must be logged in to create a patient')
      }
      return firestore
        .set(
          { collection: 'patients', doc: newInstance.number },
          {
            ...newInstance,
            lastPod: -1,
            pills: {
              0: { name: 'olmesartan' },
              1: { name: 'olmesartan' },
              2: { name: 'azithromycin' },
              3: { name: 'heparinoid' },
              4: { name: 'olmesartan' },
              5: { name: 'olmesartan' },
              6: { name: 'heparinoid' },
              7: { name: 'olmesartan' },
              8: { name: 'olmesartan' },
            },
            createdBy: uid,
            createdAt: firestore.FieldValue.serverTimestamp()
          }
        )
        .then(() => {
          toggleDialog()
          showSuccess('Patient added successfully')
        })
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'Could not add patient')
          return Promise.reject(err)
        })
    },
    deletePatient: props => patientId => {
      const { firestore, showError, showSuccess } = props
      return firestore
        .delete({ collection: 'patients', doc: patientId })
        .then(() => showSuccess('Patient deleted successfully'))
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'Could not delete patient')
          return Promise.reject(err)
        })
    },
    goToPatient: ({ history }) => patientId => {
      history.push(`${LIST_PATH}/${patientId}`)
    }
  })
)
