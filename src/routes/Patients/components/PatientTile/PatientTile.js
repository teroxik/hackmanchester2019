import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'
import styles from './PatientTile.styles'

const useStyles = makeStyles(styles)

function PatientTile({ name, number, onSelect, onDelete, showDelete }) {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <div className={classes.top}>
        <span className={classes.name} onClick={onSelect}>
          {name || 'No Name'}
        </span>
        {showDelete && onDelete ? (
          <Tooltip title="delete">
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </div>
      <div>
        <span className={classes.name} onClick={onSelect}>
          {number || 'No Number'}
        </span>
      </div>
    </Paper>
  )
}

PatientTile.propTypes = {
  name: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  showDelete: PropTypes.bool
}

PatientTile.defaultProps = {
  showDelete: true
}

export default PatientTile
