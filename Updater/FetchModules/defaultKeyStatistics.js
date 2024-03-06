const yahooFinance = require('yahoo-finance2').default;
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const logError = require('./logError')

const defaultKeyStatistics = (ticker) => new Promise(async (resolve, reject) => {
    let thisError = false

    const results = await yahooFinance.quoteSummary(ticker, { modules: ["defaultKeyStatistics"] }).catch(error => {
        thisError = true
        let message = ticker + " in defaultKeyStatistics - " + error.toString()
        logError(message,ticker,"defaultKeyStatistics")
        reject({
            defaultKeyStatisticsStatus: "ERROR",
            defaultKeyStatisticsError: message
        })
    })

    if (!thisError) {
        try {
            data = results.defaultKeyStatistics
            let structure = {}
            let defaultKeyStatistics = {}

            structure.enterpriseValue = data.enterpriseValue
            structure.forwardPE = data.forwardPE
            structure.profitMargins = data.profitMargins
            structure.floatShares = data.floatShares
            structure.sharesOutstanding = data.sharesOutstanding
            structure.sharesShort = data.sharesShort
            structure.sharesShortPriorMonth = data.sharesShortPriorMonth
            structure.shortRatio = data.shortRatio
            structure.shortPercentOfFloat = data.shortPercentOfFloat
            structure.beta = data.beta
            structure.priceToBook = data.priceToBook

            try {
                structure.lastFiscalYearEnd = new Date(data.lastFiscalYearEnd).toISOString().split("T")[0]
            } catch (error) {
                structure.lastFiscalYearEnd = data.lastFiscalYearEnd
            }

            try {
                structure.nextFiscalYearEnd = new Date(data.nextFiscalYearEnd).toISOString().split("T")[0]
            } catch (error) {
                structure.nextFiscalYearEnd = data.nextFiscalYearEnd
            }

            try {
                structure.mostRecentQuarter = new Date(data.mostRecentQuarter).toISOString().split("T")[0]
            } catch (error) {
                structure.mostRecentQuarter = data.mostRecentQuarter
            }

            structure.netIncomeToCommon = data.netIncomeToCommon
            structure.trailingEps = data.trailingEps
            structure.forwardEps = data.forwardEps
            structure.enterpriseToRevenue = data.enterpriseToRevenue
            structure.enterpriseToEbitda = data.enterpriseToEbitda
            structure["52WeekChange"] = data["52WeekChange"]
            structure.enterpriseToEbitda = data.enterpriseToEbitda
            structure.status = "OK"
            defaultKeyStatistics.defaultKeyStatistics = Object.assign({}, structure)

            resolve(defaultKeyStatistics)
        } catch (error) {
            let message = ticker + " in defaultKeyStatistics - " + error.toString()
            logError(message, ticker,'defaultKeyStatistics')
            reject({
                defaultKeyStatisticsStatus: "ERROR",
                defaultKeyStatisticsError: message
            })
        }
    }
})


module.exports = defaultKeyStatistics