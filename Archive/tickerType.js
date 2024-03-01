const yahooFinance = require('yahoo-finance2').default;
const fs = require('fs')
const path = require('path')

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const LoadTicker = require('../Models/LoadTickerModel')


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

function mongooseConnect() {
    mongoose.connect(`${database.uri}${database.name}`, database.options).then(
        () => {
            console.log("Mongo connected...")
            changeTickers()
        },
        err => {
            console.error(err)
        }
    )
}

mongooseConnect()


async function changeTickers() {
    let tickers = await LoadTicker.find({ })
    console.log(tickers.length)
    let arr = ['^GSPC', '^IXIC', 'XLC', 'XLY', 'XLP', 'XLE', 'XLF', 'XLV', 'XLI', 'XLB', 'XLRE', 'XLK', 'XLU']

    tickers.forEach(async ticker => {
        
        if (arr.indexOf(ticker.ticker) === -1) {            

            await LoadTicker.findOneAndUpdate({ ticker: ticker.ticker }, {
                tickerType: "equity"
            })

        } else {
            console.log(ticker.ticker)
            await LoadTicker.findOneAndUpdate({ ticker: ticker.ticker }, {
                tickerType: "other"
            })
        }
    })

}




