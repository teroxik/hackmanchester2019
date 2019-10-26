import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { Field } from 'redux-form'
import TextField from 'components/FormTextField'
import { required } from 'utils/form'

function NewPatientDialog({ classes, handleSubmit, open, onRequestClose }) {
  return (
    <Dialog open={open} onClose={onRequestClose}>
      <DialogTitle id="new-patient-dialog-title">New Patients Box</DialogTitle>
      <form onSubmit={handleSubmit} className={classes.inputs}>
        <DialogContent>
          <div>
            <Field
              name="name"
              component={TextField}
              label="Patient Box Name"
              validate={[required]}
            />
          </div>
          <div>
            <Field
              name="number"
              component={TextField}
              label="Patient Number"
              validate={[required]}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onRequestClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

NewPatientDialog.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  handleSubmit: PropTypes.func.isRequired, // from enhancer (reduxForm)
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
}

export default NewPatientDialog