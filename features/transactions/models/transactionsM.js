const {Schema, model} = require("mongoose");
//need to link with the blockChain
const transaction = new Schema({
    sourceAccount: String,
    destAccount: String,
    amount: Number,
    dateOfTrans: Date.now()
});

module.exports = model("Transaction", user);