
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

// const status = require('./StatusModel')


// function mongooseConnect() {
//     mongoose.connect(`${database.uri}${database.name}`, database.options).then(
//         () => {
//             console.log("Mongo connected...")
//             // getCollectionNameFromStatus()
//         },
//         err => {
//             console.error(err)
//         }
//     )
// }

// mongooseConnect()


// const status = require('./StatusModel')
// async function getCollectionNameFromStatus(){
//     query = await status.findOne({})
//     lastTickerCollectionName = query.collectionName
//     console.log(lastTickerCollectionName)
// }



database.collectionName = '' // set upon query

const TickerModel = mongoose.model(
    database.collectionName,
    new Schema({
        ticker: String,
        date: String,
        data: Schema.Types.Mixed,
    })
)

module.exports = TickerModel