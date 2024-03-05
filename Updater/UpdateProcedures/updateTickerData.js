const yahooFinance = require('yahoo-finance2').default;
const fs = require('fs')
const path = require('path')

const logError = require('../FetchModules/logError')

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
const collectionNameForListOfTickerToLoad = 'shortlistoftickers'

const Ticker = mongoose.model(collectionNameForTickerData,
    new Schema({
        ticker: String,
        date: String,
        data: Schema.Types.Mixed,
    })
)

const listOfTickers = mongoose.model(collectionNameForListOfTickerToLoad, tickerListSchema)

updateSearchTickerData()

async function updateSearchTickerData() {
    await status.setStatusObject()

    let data = await listOfTickers.find({}, 'ticker tickerType -_id')

    console.log(`Total number of tickers to be served = ${data.length}`)

    let delay = 0
    for (let q = 1; q < data.length; q++) {
        let ticker = data[q].ticker
        let tickerType = data[q].tickerType
        console.log(`ticker type if ${tickerType}`)
        delay = delay + 3000 + 1000 * Math.random()
        if (q % 50 === 0) delay = delay + 11000

        setTimeout(() => {
            getAllData(ticker, q, data.length - 1)
        }, delay)
    }
}


async function getAllData(ticker, q, lastElementIndex) {
    console.log(q)
    console.log(ticker)
    let tickerInstance = {}

    await Ticker.deleteMany({ ticker: ticker })

    status.addQueredTicker(ticker)

    tickerInstance.ticker = ticker
    tickerInstance.date = new Date().toString()

    const otherPromisses=[
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

        if (q === lastElementIndex) status.finish()
    }
    ).catch(error => {
        logError(`Error saving results for ${ticker} Error: ${error}`)
    });
}


