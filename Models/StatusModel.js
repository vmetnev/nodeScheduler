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
database.collectionName = 'status'

const StatusModel = mongoose.model(
    database.collectionName,
    new Schema({
        collectionNamePrevious:String,
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
)

module.exports = StatusModel