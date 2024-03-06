const yahooFinance = require('yahoo-finance2').default;
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const logError = require('./logError')



const summaryDetail = (ticker) => new Promise(async (resolve, reject) => {
    let thisError = false
    const results = await yahooFinance.quoteSummary(ticker, { modules: ["summaryDetail"] }).catch(error => {
        thisError = true

        let message = ticker + " in summaryDetail - " + error.toString()
        logError(message,ticker,"summaryDetail")
        reject({
            summaryDetailStatus: "ERROR",
            summaryDetailError: message
        })
    })

    if (!thisError) {

        try {
            data = results.summaryDetail
            let structure = {}
            let summaryDetail = {}

            structure.averageDailyVolume10Day = data.averageDailyVolume10Day
            structure.summaryBeta = data.beta
            structure.dayHigh = data.dayHigh
            structure.dayLow = data.dayLow
            structure.dividendRate = data.dividendRate
            structure.dividendYield = data.dividendYield
            structure.fiftyDayAverage = data.fiftyDayAverage
            structure.fiftyTwoWeekHigh = data.fiftyTwoWeekHigh
            structure.fiftyTwoWeekLow = data.fiftyTwoWeekLow
            structure.fiveYearAvgDividendYield = data.fiveYearAvgDividendYield
            structure.summaryForwardPE = data.forwardPE
            structure.summaryMarketCap = data.marketCap
            structure.openPrice = data['open']
            structure.payoutRatio = data.payoutRatio
            structure.previousClose = data.previousClose
            structure.summaryRegularMarketDayHigh = data.regularMarketDayHigh
            structure.summaryRegularMarketDayLow = data.regularMarketDayLow
            structure.regularMarketOpen = data.regularMarketOpen
            structure.summaryRegularMarketPreviousClose = data.regularMarketPreviousClose
            structure.trailingAnnualDividendRate = data.trailingAnnualDividendRate
            structure.trailingAnnualDividendYield = data.trailingAnnualDividendYield
            structure.trailingPE = data.trailingPE
            structure.twoHundredDayAverage = data.twoHundredDayAverage


            structure.status = "OK"
            summaryDetail.summaryDetail = Object.assign({}, structure)
            resolve(summaryDetail)
        } catch (error) {
            let message = ticker + " in summaryDetail - " + error.toString()
            logError(message,ticker,"summaryDetail")
            reject({
                summaryDetailStatus: "ERROR",
                summaryDetailError: message
            })
        }
    }

})


module.exports = summaryDetail




