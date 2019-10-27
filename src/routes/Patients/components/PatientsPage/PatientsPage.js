import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase/lib/helpers'
import { Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import PatientRoute from 'routes/Patients/routes/Patient'
import PatientTile from '../PatientTile'
import NewPatientTile from '../NewPatientTile'
import NewPatientDialog from '../NewPatientDialog'
import { renderChildren } from 'utils/router'
import styles from './PatientsPage.styles'

const useStyles = makeStyles(styles)

function PatientsPage({
  patients,
  collabProjects,
  auth,
  newDialogOpen,
  toggleDialog,
  deletePatient,
  addPatient,
  match,
  goToPatient
}) {
  const classes = useStyles()

  return (
    <Switch>
      {/* Child routes */}
      {renderChildren([PatientRoute], match, { auth })}
      {/* Main Route */}
      <Route
        exact
        path={match.path}
        render={() => (
          <div className={classes.root}>
            <NewPatientDialog
              onSubmit={addPatient}
              open={newDialogOpen}
              onRequestClose={toggleDialog}
            />
            <div className={classes.tiles}>
              <NewPatientTile onClick={toggleDialog} />
              {!isEmpty(patients) &&
                patients.map((patient, ind) => (
                  <PatientTile
                    key={`Panel-${patient.id}-${ind}`}
                    name={patient.name}
                    number={patient.number}
                    period={patient.defaultPeriod}
                    numberOfPods={patient.numberOfPods}
                    onSelect={() => goToPatient(patient.id)}
                    onDelete={() => deletePatient(patient.id)}
                  />
                ))}
            </div>
          </div>
        )}
      />
    </Switch>
  )
}

PatientsPage.propTypes = {
  match: PropTypes.object.isRequired, // from enhancer (withRouter)
  auth: PropTypes.object, // from enhancer (connect + firebaseConnect - firebase)
  patients: PropTypes.array, // from enhancer (connect + firebaseConnect - firebase)
  newDialogOpen: PropTypes.bool, // from enhancer (withStateHandlers)
  toggleDialog: PropTypes.func.isRequired, // from enhancer (withStateHandlers)
  deletePatient: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  collabPatients: PropTypes.object, // from enhancer (withHandlers - firebase)
  addPatient: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  goToPatient: PropTypes.func.isRequired // from enhancer (withHandlers - router)
}

export default PatientsPage
