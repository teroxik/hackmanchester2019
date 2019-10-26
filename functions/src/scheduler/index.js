import * as functions from 'firebase-functions'

/**
 * Handle scheduler pub sub event
 * @param {functions.pubsub.Context} context - Function context
 * @returns {Promise}
 */
async function schedulerEvent(context) {
  console.log('Pub Sub message: ', { context })

  // End function execution by returning
  return null
}

const schedule = 'every 5 minutes'

/**
 * Cloud Function triggered on a specified CRON schedule
 *
 * Trigger: `PubSub - onRun`
 * @name scheduler
 * @type {functions.CloudFunction}
 */
export default functions.pubsub.schedule(schedule).onRun(schedulerEvent)
