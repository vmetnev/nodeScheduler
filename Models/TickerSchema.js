const mongoose = require("mongoose");
const {
    Schema
} = mongoose;


const TickerSchema =
    new Schema({
        ticker: String,
        date: String,
        data: Schema.Types.Mixed,
    })

module.exports = TickerSchema