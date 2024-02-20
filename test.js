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

            getData()
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



async function getData() {
    let tickerList = []

    Ticker.find({}).then(data => {
        data.forEach(async line => {
            tickerList.push(line.ticker)
        })

        let randomTickerList = []
        console.log(tickerList.length)
        while (tickerList.length > 0) {
            let index = 0 + Math.round(Math.random(tickerList.length - 1)) * (tickerList.length - 1)

            let interim = tickerList[index]

            randomTickerList.push(interim)
            tickerList.splice(index, 1)
        }




        console.log(randomTickerList.length)
        console.log('done')
        mongoose.disconnect()
    }

    )






}