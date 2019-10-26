import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import * as sms from '../shared/sms'

/**
 * Handle request from calling /processor endpoint
 * @param {object} req - Express HTTP Request
 * @param {object} res - Express HTTP Response
 * @returns {Promise} Resolves after handling request
 */
export async function processorRequest(req, res) {
  const db = admin.firestore()
  await db
    .collection(`/patients`)
    .get()
    .then(async snpsht => {
      for (let doc of snpsht) {
        // doc.data() is never undefined for query doc snapshots
        const patient = doc.data()
        const lastPod = doc.lastPod
        const number = `+${patient.number}`

        if (lastPod || lastPod === 0) {
          const medicine = doc[`taken${lastPod}`]
          const vote = doc[`vote${lastPod}`]
          if (!medicine) {
           console.log('SendingT the sms')
           await sms.sendTakePillText(number, lastPod)
          } else if (!vote) {
            console.log('Sending vote request')
            await sms.sendVoteText(number)
          }
        }
        console.log(doc.id, ' => ', patient)
      }
    })
    .catch(function(error) {
      console.log('Error getting documents: ', error)
    })
  // Write response to request to end function execution
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
  res.end('Hello from processor')
}

/**
 * @name processor
 * Cloud Function triggered by HTTP request
 * @type {functions.CloudFunction}
 */
export default functions.https.onRequest(processorRequest)
