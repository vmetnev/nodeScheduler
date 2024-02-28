
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

database.collectionName = 'tickerdata2024-02-24'

const TickerModel = mongoose.model(
    database.collectionName,
    new Schema({
        ticker: String,
        date: String,
        data: Schema.Types.Mixed,
    })
)

module.exports = TickerModel