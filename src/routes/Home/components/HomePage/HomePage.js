import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import styles from './HomePage.styles'

const drugRecalls = 'https://github.com/mjrussell/redux-auth-wrapper'

const useStyles = makeStyles(styles)

function Home() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className="flex-row-center">
        <h2>SPS - Smart Pill Insights</h2>
        <h3>SOT - SMS - of things</h3>
      </div>
      <div className="flex-row-center">
        <div className={classes.section}>
          <h3>Drugs Related Information</h3>
          <ul>
            <li>
              <a href={drugRecalls} target="_blank" rel="noopener noreferrer">
                Drug Recalls
              </a>
            </li>
            <li></li>
          </ul>
        </div>
        <div className={classes.section}>
          <h4>Logged Out</h4>
          <span>
            User is redirected to <pre>/login</pre> if not authenticated and
            trying to vist:
          </span>
        </div>
        <div className={classes.section}>
          <h4>Logged In</h4>
          <span>
            User is redirected to <pre>/projects</pre> if authenticated and
            trying to vist:
          </span>
        </div>
        <div className={classes.section}>
          <span>The following routes use redux-form:</span>
        </div>
      </div>
    </div>
  )
}

export default Home
