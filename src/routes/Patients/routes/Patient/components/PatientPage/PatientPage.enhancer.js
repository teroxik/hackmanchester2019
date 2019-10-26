import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { get } from 'lodash'
import firestoreConnect from 'react-redux-firebase/lib/firestoreConnect'
import { withRouter } from 'react-router-dom'
import { setPropTypes, setDisplayName, withProps } from 'recompose'
import { spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'

export default compose(
  // Set component display name (more clear in dev/error tools)
  setDisplayName('EnhancedPatientPage'),
  // Redirect to /login if user is not logged in
  UserIsAuthenticated,
  // Add props.match
  withRouter,
  // Set proptypes of props used in HOCs
  setPropTypes({
    // From react-router
    match: PropTypes.shape({
      params: PropTypes.shape({
        patientId: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }),
  // Map projectId from route params (projects/:projectId) into props.projectId
  withProps(({ match: { params: { patientId } } }) => ({
    patientId
  })),
  // Create firestore listeners on mount
  firestoreConnect(({ patientId }) => [
    // Listener for projects the current user created
    {
      collection: 'patients',
      doc: patientId
    }
  ]),
  // Map projects from redux state to props
  connect(({ firestore: { data } }, { patientId }) => ({
    patient: get(data, `patients.${patientId}`)
  })),
  // Show loading spinner while project is loading
  spinnerWhileLoading(['patient'])
)
