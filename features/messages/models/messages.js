
var { getCurrentDateTime } = require("utils\\times.js");
var { addMessageToConvo } = require("./convos");

const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
    //maybe need id too - that we affield 
    source: Number,
    dest: Number,
    time: Date
});

function getMessages(convo) {
    return messageSchema.find({ ID: { $in: convo.messages } }).toArray();
}

async function addMessage(convo, message) {
    console.log(convo);
    message.ID = await getNewID();
    message.time = getCurrentDateTime();
    messageSchema.insertOne(message);
    addMessageToConvo(convo, message);
}

async function getNewID() {
    try {
        let highestID = await messageSchema.find().sort({ ID: -1 }).limit(1).toArray();
        return highestID[0].ID + 1;
    }
    catch {
        return 0;
    }
}

module.exports = {
    getMessages,
    addMessage,
};