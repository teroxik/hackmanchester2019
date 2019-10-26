import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import styles from './PatientPage.styles'

const useStyles = makeStyles(styles)

function PatientPage({ patient, patientId }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} component="h2">
            {patient.name || 'Patient'}
          </Typography>
          <Typography className={classes.subtitle}>{patientId}</Typography>
          <div style={{ marginTop: '10rem' }}>
            <pre>{JSON.stringify(patient, null, 2)}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

PatientPage.propTypes = {
  patient: PropTypes.object.isRequired, // from enhancer (connect)
  patientId: PropTypes.string.isRequired // from enhancer (withProps)
}

export default PatientPage
