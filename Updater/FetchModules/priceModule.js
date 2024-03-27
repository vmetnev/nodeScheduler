const yahooFinance = require('yahoo-finance2').default;
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const logError = require('./logError')



const priceModule = (ticker) => new Promise(async (resolve, reject) => {
    let thisError = false
    const results = await yahooFinance.quoteSummary(ticker, { modules: ["price"] }).catch(error => {
        thisError = true
        let message = ticker + " in priceModule - " + error.toString()
        logError(message, ticker, "priceModule")
        reject({
            priceModuleStatus: "ERROR",
            priceModuleError: message
        })
    })

    if (!thisError) {

        try {
            data = results.price
            let structure = {}
            let priceModule = {}

            structure.preMarketChangePercent = (data.preMarketChangePercent) ? data.preMarketChangePercent : 'n.a.'
            structure.preMarketPrice = (data.preMarketPrice) ? data.preMarketPrice : "n.a."
            structure.postMarketPrice = (data.postMarketPrice) ? data.postMarketPrice : 'n.a.'
            structure.regularMarketChangePercent = data.regularMarketChangePercent

            try {
                structure.regularMarketTime = new Date(data.regularMarketTime).toISOString().split("T")[0] + " - " + new Date(data.regularMarketTime).toISOString().split("T")[1].substring(0, 8);
            } catch (error) {
                structure.regularMarketTime = data.regularMarketTime
            }

            structure.regularMarketPrice = data.regularMarketPrice
            structure.regularMarketDayHigh = data.regularMarketDayHigh
            structure.regularMarketDayLow = data.regularMarketDayLow
            structure.regularMarketVolume = data.regularMarketVolume
            structure.regularMarketPreviousClose = data.regularMarketPreviousClose
            structure.marketState = data.marketState
            structure.quoteType = data.quoteType
            structure.symbol = data.symbol
            structure.longName = data.longName
            structure.tradingCurrency = data.currency
            structure.marketCap = data.marketCap

            structure.status = "OK"
            priceModule.priceModule = Object.assign({}, structure)            
            resolve(priceModule)
        } catch (error) {
            let message = ticker + " in priceModule - " + error.toString()
            logError(message, ticker, "priceModule")
            reject({
                priceModuleStatus: "ERROR",
                priceModuleError: message
            })
        }
    }

})


module.exports = priceModule



