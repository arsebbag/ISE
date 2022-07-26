const { Schema, model } = require('mongoose')

const exchangeSchema = new Schema({
    levCoinRate: {
        USD: Number,
        ILS: Number,
    },
    date: date.now()
});

module.exports = model("Exchange", exchangeSchema);