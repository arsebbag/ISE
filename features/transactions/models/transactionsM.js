const {Schema, model} = require("mongoose");
//need to link with the blockChain
const transactionSchema = new Schema({
    sourceAccount: String,
    destAccount: String,
    amount: Number,
    dateOfTrans: { type: Date, default: Date.now }
});

module.exports = model("Transaction", transactionSchema);