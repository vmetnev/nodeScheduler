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
database.collectionName = 'newsStories'

const newsStory = mongoose.model(
    database.collectionName,
    new Schema({
        mainQuery: String,
        title: String,
        link: String,
        publisher: String,
        uuid: String,
        relatedTickers: [String],
        providerPublishTime:String,
        unixDateAndTimeAdded: Number
    })
)

module.exports = newsStory