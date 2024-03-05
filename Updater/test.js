const { database, mongooseConnect } = require('./A_KEY_DATA/keyData')
const mongoose = require("mongoose");
const Schema = mongoose.Schema
mongoose.set("strictQuery", false);
mongooseConnect()

const tickerListSchema = require('./Schemas/tickerListSchema')

const collectionNameForTickerData = `tickerData${new Date().toISOString().slice(0, 10)}`
const collectionNameForErrorLog = `errorTickerData${new Date().toISOString().slice(0, 10)}`
const collectionNameForListOfTickerToLoad = 'shortlistoftickers'

const Ticker = mongoose.model(collectionNameForTickerData,
    new Schema({
        ticker: String,
        date: String,
        data: Schema.Types.Mixed,
    })
)

const listOfTickers = mongoose.model(collectionNameForListOfTickerToLoad, tickerListSchema)

updateData()
let counter=0
async function updateData() {
    let tickers = await listOfTickers.find({}, 'ticker tickerType -_id')
    tickers.forEach(async ticker => {
        if (ticker.tickerType != "other") {
            counter++
            console.log(counter)
            await listOfTickers.findOneAndUpdate({ ticker: ticker.ticker }, { tickerType: "equity" })
        }



    });
}

