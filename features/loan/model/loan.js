const { Schema, model } = require("mongoose");
const loanSchema = new Schema({
    destAccount: String,
    amount: Number,
    managerID: String, //that authorized it
    dateOfLoan: { type: Date, default: Date.now },
    duration: {type: Date}
});

module.exports = model("Loan", loanSchema);