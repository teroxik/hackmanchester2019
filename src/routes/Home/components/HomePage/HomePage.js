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
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
