
const mongoose = require("mongoose");
const {
    Schema
} = mongoose;

const database = {
    uri: "mongodb://127.0.0.1:27017/",
    name: "scheduler",
    user: "",
    password: "",
    options: {},
};

database.collectionName = 'tickerdata' + new Date().toISOString().slice(0,10)

const TickerModel = mongoose.model(
    database.collectionName,
    new Schema({
        ticker: String,
        date: String,
        data: Schema.Types.Mixed,
    })
)

module.exports = TickerModel