import got from 'got'

const CLOCKWORK_API_KEY = '3589a6cf274af563851cb0940f31d25b1f277b41'

const sendText = async (to, content) => {
  return got(
    `https://api.clockworksms.com/http/send.aspx?key=${CLOCKWORK_API_KEY}&to=${to}&content=${content}`
  )
}

const sendVoteText = async to => {
  return sendText(to, 'V0')
}

const sendTakePillText = async (to, pillNumber) => {
  return sendText(to, `T${pillNumber}`)
}

module.exports = {
  sendVoteText,
  sendTakePillText
}
