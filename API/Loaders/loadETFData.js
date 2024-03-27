const yahooFinance = require('yahoo-finance2').default;
const fs = require('fs')
const path = require('path')
 
// Adding fetch modules
const assetProfile = require('../../Updater/FetchModules/assetProfile')
const calendarEvents = require('../../Updater/FetchModules/calendarEvents')
const earningsHistory = require('../../Updater/FetchModules/earningsHistory')
const defaultKeyStatistics = require('../../Updater/FetchModules/defaultKeyStatistics')
const earningsTrend = require('../../Updater/FetchModules/earningsTrend')
const financialData = require('../../Updater/FetchModules/financialData')
const recommendationTrend = require('../../Updater/FetchModules/recommendationTrend')
const summaryDetail = require('../../Updater/FetchModules/summaryDetail')
const upgradeDowngradeHistory = require('../../Updater/FetchModules/upgradeDowngradeHistory')
const priceModule = require('../../Updater/FetchModules/priceModule')
const fiveYearPriceData = require('../../Updater/FetchModules/fiveYearPriceData')


async function leadETFData(ticker) {
    return new Promise((resolve, reject) => {
        let tickerInstance = {}
        tickerInstance.ticker = ticker
        tickerInstance.date = new Date().toString()

        const etsPromisses = [
            assetProfile(ticker),            
            fiveYearPriceData(ticker),
            defaultKeyStatistics(ticker),            
            priceModule(ticker),            
            summaryDetail(ticker),            
        ]

        Promise.allSettled(etsPromisses).then((results) => {
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
            
            reject(erMsg)
        });
    })
}

module.exports = leadETFData