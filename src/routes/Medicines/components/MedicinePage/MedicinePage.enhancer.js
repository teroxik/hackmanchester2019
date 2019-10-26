import { compose } from 'redux'
import { connect } from 'react-redux'
import { get } from 'lodash'
import firestoreConnect from 'react-redux-firebase/lib/firestoreConnect'
import { withRouter } from 'react-router-dom'
import { setDisplayName } from 'recompose'
import { spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'

export default compose(
  // Set component display name (more clear in dev/error tools)
  setDisplayName('MedicinePage'),
  // Redirect to /login if user is not logged in
  UserIsAuthenticated,
  // Add props.match
  withRouter,
  // Set proptypes of props used in HOCs
  // Create firestore listeners on mount
  firestoreConnect(() => [
    // Listener for projects the current user created
    {
      collection: 'medicines',
      doc: 'test'
    }
  ]),
  // Map projects from redux state to props
  connect(({ firestore: { data } }) => {
    console.log(data);
    return ({
      project: get(data, `medicines.test`)
    })
  }),
  // Show loading spinner while project is loading
  spinnerWhileLoading(['project'])
)
