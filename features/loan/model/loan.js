const {Schema} = require("mongoose");
const loan = new Schema({
    destAccount: String,
    amount: Number,
    managerID: String,
    dateOfLoan: Date.now()
});

module.exports = mongoose.model("Loan", user);