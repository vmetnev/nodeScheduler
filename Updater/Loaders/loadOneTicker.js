const yahooFinance = require('yahoo-finance2').default;
const fs = require('fs')
const path = require('path')
const updateNewsStories = require('./updateNewsStories') // maybe we should add news stories as well
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

loadOneTicker('AAPL').then(data => {
    console.log(data)
})

async function loadOneTicker(ticker) {
    return new Promise((resolve, reject) => {
        let tickerInstance = {}
        tickerInstance.ticker = ticker
        tickerInstance.date = new Date().toString()

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
            let output = {}
            output.ticker = tickerInstance.ticker
            output.data = tickerInstance
            resolve(output)
        }
        ).catch(error => {
            let erMsg = `Error saving results for ${ticker} Error: ${error}`, ticker
            logError(erMsg)
            reject(erMsg)
        });
    })
}


module.exports = loadOneTicker