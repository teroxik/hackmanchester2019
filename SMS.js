const got = require('got');
const CLOCKWORK_API_KEY = '3589a6cf274af563851cb0940f31d25b1f277b41';

// example incoming text ?id=AB_123&to=12345&from=441234567890&content=Hello%20world

const handleText = async (content) => {
    if (content && content.length && content.length > 1){
        const firstChar = content[0];
        const secondChar = content[1];
        switch(firstChar){
            case 'V':
                await hasVoted(secondChar);
                break;
            case 'R':
                await takenRightPod(secondChar);
                break;
            case 'W':
                await takenWrongPod(secondChar);
                break;
            default:
                console.log("wrong message idiot");
        }
    } else {
        console.log("content is empty idiot");
    }
}

const takenRightPod = async (podNumber) => {

}

const takenWrongPod = async (podNumber) => {

}

const hasVoted = async (voteNumber) => {

}


const sendText = async (to, content) => {
    return await got(`https://api.clockworksms.com/http/send.aspx?key=${CLOCKWORK_API_KEY}&to=${to}&content=${content}`);
}

module.exports = {
    sendText,
    handleText
}