const mongoose = require("mongoose");
const transaction = new mongoose.Schema({
    sourceAccount: String,
    destAccount: String,
    amount: Number,
    
});

module.exports = mongoose.model("Transaction", user);