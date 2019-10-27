import * as functions from 'firebase-functions'
import got from 'got'

/**
 * Cloud Function triggered on a specified CRON schedule
 *
 * Trigger: `PubSub - onRun`
 * @name scheduler
 * @type {functions.CloudFunction}
 */
async function schedulerEvent(context) {
  console.log('Pub Sub message: ', { context })
  // End function execution by returning
  got('https://us-central1-hackmanchester2019.cloudfunctions.net/processor')
  return null
}

const schedule = 'every 1 minutes'

/**
 * Cloud Function triggered on a specified CRON schedule
 *
 * Trigger: `PubSub - onRun`
 * @name scheduler
 * @type {functions.CloudFunction}
 */
export default functions.pubsub.schedule(schedule).onRun(schedulerEvent)
