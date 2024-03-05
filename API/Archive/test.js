

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

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

const tickerSchema = require('../Models/TickerSchema')
const Ticker = mongoose.model('tickerdata2024-02-28', tickerSchema)

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

getData()

async function getData() {

    let data = await Ticker.find({ 'data.priceModule.marketCap': { $gte: 3000000000 } }, 'ticker data.priceModule.marketCap -_id')

    let output = []

    let min = 0
    let counter = 0

    data.forEach(company => {
        if (counter === 0) min = company.data.priceModule.marketCap

        
            output.push({ ticker: company.ticker, mc: company.data.priceModule.marketCap })
        

        if (min>company.data.priceModule.marketCap) min=company.data.priceModule.marketCap


        counter++
    })
    console.log(output)
    console.log(output.length)
    console.log(min)

    mongoose.disconnect()
}