import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import styles from './HomePage.styles'
import patientCendredAproach from 'static/patient-centred-approach.png'
import pillbox from 'static/PillBox.jpg'
import pillboxCss from 'static/PillBoxCss.jpg'
import { LIST_PATH } from 'constants/paths'
import { Link } from 'react-router-dom'

const medication = 'https://www.england.nhs.uk/medicines/medicines-optimisation'
const drugRecalls = 'https://github.com/mjrussell/redux-auth-wrapper'

const useStyles = makeStyles(styles)

function Home() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className="flex-row-center">
        <div className={classes.section}>
          <h2>SPS - Smart Pill Insights</h2>
          <p>
            Two way communication platform for scheduled drug consumption via
            SMS with a feedback channel.
          </p>
          <Link to={LIST_PATH}>Patients</Link>
          <h2>Did you know? </h2>
          <ul>
            <li>One quarter of the population has a long-term condition</li>
            <li>
              One quarter of people over 60 have two or more long-term
              conditions
            </li>
            <li>
              With an ageing population, the use of multiple medicines (known as
              polypharmacy) is increasing
            </li>
            <li>
              Between 30-50% of medicines prescribed for long-term conditions
              are not taken as intended
            </li>
          </ul>
          <div className={classes.section}>
            <img
              className={classes.patientApproach}
              src={patientCendredAproach}
              alt=""
            />
          </div>
        </div>
        <h3>Core Features</h3>
        <ul>
          <li>Simple SMS - Protocol, available for anybody with phone</li>
          <li>SOT - SMS of devices enabled pillbox </li>
          <li>
            Dedicated Dashbord for GP / Parents - for performing trials and feel
            of the patients or to monitor consumption.
          </li>
        </ul>
        <h3>Pillbox with CSS</h3>
        <img className={classes.patientApproach} src={pillboxCss} alt="" />
        <h3>Pillbox without CSS</h3>
        <img className={classes.patientApproach} src={pillbox} alt="" />

      </div>
      <div className="flex-row-center">
        <div className={classes.section}>
          <h3>Drugs Related Information and References</h3>
          <ul>
            <li>
              <a href={medication} target="_blank" rel="noopener noreferrer">
                Medicines optimisation
              </a>
            </li>
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
