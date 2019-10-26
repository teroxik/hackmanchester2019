import * as functions from 'firebase-functions'

/**
  * Handle request from calling /clockwork endpoint
  * @param {object} req - Express HTTP Request
  * @param {object} res - Express HTTP Response
  * @returns {Promise} Resolves after handling request
  */
 export async function clockworkRequest(req, res) {
   // Write response to request to end function execution
   res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
   res.end('Hello from clockwork')
 }

/**
 * @name clockwork
 * Cloud Function triggered by HTTP request
 * @type {functions.CloudFunction}
 */
export default functions.https.onRequest(clockworkRequest)
