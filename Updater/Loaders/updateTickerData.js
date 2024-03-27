const yahooFinance = require('yahoo-finance2').default;
const fs = require('fs')
const path = require('path')
const updateNewsStories = require('./updateNewsStories')
const logError = require('../FetchModules/logError')

const process = require('node:process');

// Adding fetch modules
const assetProfile = require('../FetchModules/assetProfile')
const calendarEvents = require('../FetchModules/calendarEvents')
const earningsHistory = require('../FetchModules/earningsHistory')
const defaultKeyStatistics = require('../FetchModules/defaultKeyStatistics')
const earningsTrend = require('../FetchModules/earningsTrend')
const financialData = require('../FetchModules/financialData')
const recommendationTrend = require('../FetchModules/recommendationTrend')
const summaryDetail = require('../FetchModules/summaryDetail')
const upgradeDowngradeHistory = require('../FetchModules/upgradeDowngradeHistory')
const priceModule = require('../FetchModules/priceModule')
const fiveYearPriceData = require('../FetchModules/fiveYearPriceData')

const status = require('../Controllers/statusController')
const tickerListSchema = require('../Schemas/tickerListSchema')

const { database, mongooseConnect } = require('../A_KEY_DATA/keyData')
const mongoose = require("mongoose");
const Schema = mongoose.Schema
mongoose.set("strictQuery", false);
mongooseConnect()

const collectionNameForTickerData = `tickerData${new Date().toISOString().slice(0, 10)}`
const collectionNameForErrorLog = `errorTickerData${new Date().toISOString().slice(0, 10)}`
// const collectionNameForListOfTickerToLoad = 'shortlistoftickers'

const Ticker = mongoose.model(collectionNameForTickerData,
    new Schema({
        ticker: String,
        date: String,
        data: Schema.Types.Mixed,
    })
)

let thisListOfTickers = mongoose.model('shortlistoftickers', tickerListSchema)

updateSearchTickerData()

async function updateSearchTickerData() {
    await status.setStatusObject()

    let data = await thisListOfTickers.find({}, 'ticker tickerType -_id')

    console.log(`Total number of tickers to be served = ${data.length}`)

    let delay = 0
    for (let q = 0; q < data.length; q++) {
        let ticker = data[q].ticker
        let tickerType = data[q].tickerType

        delay = delay + 2000 + 1000 * Math.random()
        if (q % 50 === 0) delay = delay + 7500

        setTimeout(() => {
            getAllData(ticker, q, data.length - 1)
        }, delay)
    }
}


async function getAllData(ticker, q, lastElementIndex) {
    console.log(`${q}- of ${lastElementIndex}`)
    console.log(ticker)
    let tickerInstance = {}

    await Ticker.deleteMany({ ticker: ticker })

    status.addQueredTicker(ticker)

    tickerInstance.ticker = ticker
    tickerInstance.date = new Date().toString()

    const otherPromisses = [
        summaryDetail(ticker),
        priceModule(ticker),
        fiveYearPriceData(ticker),
    ]


    const equityPromisses = [
        assetProfile(ticker),
        calendarEvents(ticker),
        fiveYearPriceData(ticker),
        defaultKeyStatistics(ticker),
        earningsHistory(ticker),
        earningsTrend(ticker),
        financialData(ticker),
        priceModule(ticker),
        recommendationTrend(ticker),
        summaryDetail(ticker),
        upgradeDowngradeHistory(ticker),
    ]

    Promise.allSettled(equityPromisses).then((results) => {

        results.forEach((result) => {
            if (result.value && result.value.length > 1) {
                if (result.status === "fulfilled") {
                    Object.assign(tickerInstance, result.value[0])
                    Object.assign(tickerInstance, result.value[1])
                } else {
                    Object.assign(tickerInstance, result.reason)
                }


            } else {
                if (result.status === "fulfilled") {
                    Object.assign(tickerInstance, result.value)
                } else {
                    Object.assign(tickerInstance, result.reason)
                }
            }
        })


        let ticker = new Ticker()
        ticker.ticker = tickerInstance.ticker
        ticker.data = tickerInstance
        ticker.save()

        if (q === lastElementIndex) {
            status.finish()
            updateNewsStories()
        }
    }
    ).catch(error => {
        logError(`Error saving results for ${ticker} Error: ${error}`, ticker)
    });
}

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    // Application specific logging, throwing an error, or other logic here
});

module.exports = updateSearchTickerData