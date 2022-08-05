const {Schema, model} = require("mongoose");
//need to link with the blockChain
const transactionSchema = new Schema({
    id: Number, //of blockchain check it again
    sourceAccountId: String,
    destAccountId: String,

    thisHash: String,
    PrevHash: String,
    amount: Number,
    dateOfTrans: { type: Date, default: Date.now }
});

module.exports = model("Transaction", transactionSchema);