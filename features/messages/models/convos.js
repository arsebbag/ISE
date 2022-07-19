const mongoose = require("mongoose");
const convoSchema = new mongoose.Schema({
    name: String,
    distName: String,
}, { timestamps: true });

async function addConvo(convo) {
    convoSchema.insertOne(convo);
}

async function addMessageToConvo(convo, message) {
    convo.messages.push(message.ID);
    let convoToUpdate = { manName: convo.manName, distName: convo.distName };
    let newList = { $set: { messages: convo.messages } };
    convoSchema.updateOne(convoToUpdate, newList, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });
}

async function getConvo(mname, dname) {
    return convoSchema.findOne({ manName: mname, distName: dname });
}

function getConvos(name) {
    return convoSchema
        .find({
            $or: [{ manName: name }, { distName: name }],
        })
        .toArray();
}

module.exports = mongoose.model("Transaction", user), { getConvo, getConvos, addConvo, addMessageToConvo };