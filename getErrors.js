const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const fs = require('fs')

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

database.collectionName = `tickerData ${new Date().toISOString().slice(0, 10)}`

function mongooseConnect() {
    mongoose.connect(`${database.uri}${database.name}`, database.options).then(
        () => {
            console.log("Mongo connected...")
        },
        err => {
            console.error(err)
        }
    )
}

mongooseConnect()

const Ticker = mongoose.model(
    'tickerData 20240219',
    new Schema({
        ticker: String,
        date: String,
        data: Schema.Types.Mixed,
    })
)

const ErrorLog = mongoose.model(
    'error20240219',
    new Schema({
        ticker: String,
        message: String,
    })
)

getData()

async function getData() {
    ErrorLog.find({}).then(data =>
        
        data.forEach(async line => {
            let writeLine = `${line.ticker},${line.message} \n`
             fs.appendFileSync('errors.txt', writeLine, "utf-8")
        })
        )
 console.log('done')
 mongoose.disconnect()



}