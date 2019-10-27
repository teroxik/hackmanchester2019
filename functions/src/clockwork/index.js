import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

/**
 * Handle request from calling /clockwork endpoint
 * @param {object} req - Express HTTP Request
 * @param {object} res - Express HTTP Response
 * @returns {Promise} Resolves after handling request
 */
export async function clockworkRequest(req, res) {
  // Write response to request to end function execution
  console.log(`The sms data -  ${JSON.stringify(req.query)}`)

  await handleText(req.query)

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
  res.end('Sms process')
}

const handleText = async message => {
  const number = message.from
  const content = message.content
  if (content && content.length && content.length > 1) {
    const firstChar = content[0]
    const secondChar = content[1]
    switch (firstChar) {
      case 'V':
        await hasVoted(secondChar, number)
        break
      case 'R':
        await takenRightPod(secondChar, number)
        break
      case 'W':
        await takenWrongPod(secondChar, number)
        break
      default:
        console.log('wrong message idiot')
    }
  } else {
    console.log('content is empty idiot')
  }
}

const takenRightPod = async (podNumber, number) => {
  const db = admin.firestore()
  const docRef = db.collection('patients').doc(`${number}`)

  return docRef.update({
    lastPod: podNumber,
    [`pills.${podNumber}.correct`]: true,
    [`pills.${podNumber}.taken`]: new Date()
  })
}

const takenWrongPod = async (podNumber, number) => {
  const db = admin.firestore()
  const docRef = db.collection('patients').doc(`${number}`)

  return docRef.update({
    lastPod: podNumber,
    [`pills.${podNumber}.correct`]: false,
    [`pills.${podNumber}.taken`]: new Date()
  })
}

const hasVoted = async (voteNumber, number) => {
  const db = admin.firestore()
  const docRef = db.collection('patients').doc(`${number}`)

  docRef.get().then(doc => {
    const patient = doc.data()
    docRef.update({
      [`pills.${patient.lastPod}.vote`]: voteNumber,
      [`pills.${patient.lastPod}.voteTaken`]: new Date(),
    })
  })
}

/**
 * @name clockwork
 * Cloud Function triggered by HTTP request
 * @type {functions.CloudFunction}
 */
export default functions.https.onRequest(clockworkRequest)
