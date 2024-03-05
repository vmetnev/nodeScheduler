const mongoose = require("mongoose");
const Schema = mongoose.Schema

const StatusSchema = new Schema({
    collectionNamePrevious: String,
    collectionName: String,
    tickerUpdateCurrentStatus: String,
    tickerUpdateStartTime: String,
    tickerUpdateEndTime: String,
    noOfTickersQuered: Number,
    listOfTickersQuered: [String],
    noOfTickersOK: Number,
    listOfTickersOK: [String],
    noOfTickersErrors: Number,
    noOfErrors: Number,
    listOfTickersWithErrors: [String],
    arrayOfErrors: [String],
    lastQueryTime: String
})

module.exports = StatusSchema