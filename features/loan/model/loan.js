const { Schema } = require("mongoose");
const loan = new Schema({
    destAccount: String,
    amount: Number,
    managerID: String, //that authorized it
    dateOfLoan: Date.now()
});

module.exports = mongoose.model("Loan", user);