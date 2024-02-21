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
        nameOfPreviousCollectionForTickersData:String,
        nameOfPreviousCollectionForTickerError:String,

        nameOfCurrentCollectionForTickersData:String,
        nameOfCurrentCollectionForTickerError:String,

        tickerUpdateCurrentStatus: String,
        tickerUpdateStartTime: String,        
        tickerUpdateEndTime: String,
        
        listOfTickersQueredNumber: Number,
        listOfTickersQueredArray: [String],
        
        listOfTickersSavedWithOutErrorsNumber: Number,
        listOfTickersSavedWithOutErrorsArray: [String],
        
        listOfUniqueTickersWithMistakesNumber: Number,
        listOfUniqueTickersWithMistakesArray: [Array],
        arrayOfCurrentOrLastErrors:[String]
    })
)

module.exports = StatusModel