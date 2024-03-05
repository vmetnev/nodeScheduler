const yahooFinance = require('yahoo-finance2').default;
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const logError = require('./logError')

const financialData = (ticker) => new Promise(async (resolve, reject) => {
    let thisError = false
    const results = await yahooFinance.quoteSummary(ticker, { modules: ["financialData"] }).catch(error => {
        thisError = true

        let message = ticker + " in financialData - " + error.toString()
        logError(message)
        reject({
            financialDataStatus: "ERROR",
            financialDataError: message
        })

    })

    if (!thisError) {

        try {
            data = results.financialData
            let structure = {}
            let financialData = {}


            structure.currentPrice = data.currentPrice
            structure.targetHighPrice = data.targetHighPrice
            structure.targetLowPrice = data.targetLowPrice
            structure.targetMeanPrice = data.targetMeanPrice
            structure.targetMedianPrice = data.targetMedianPrice
            structure.recommendationMean = data.recommendationMean
            structure.recommendationKey = data.recommendationKey
            structure.numberOfAnalystOpinions = data.numberOfAnalystOpinions
            structure.totalCash = data.totalCash
            structure.totalCashPerShare = data.totalCashPerShare
            structure.ebitda = data.ebitda
            structure.totalDebt = data.totalDebt
            structure.totalRevenue = data.totalRevenue
            structure.debtToEquity = data.debtToEquity
            structure.revenuePerShare = data.revenuePerShare
            structure.returnOnAssets = data.returnOnAssets
            structure.returnOnEquity = data.returnOnEquity
            structure.grossProfits = data.grossProfits
            structure.freeCashflow = data.freeCashflow
            structure.operatingCashflow = data.operatingCashflow
            structure.earningsGrowth = data.earningsGrowth
            structure.revenueGrowth = data.revenueGrowth
            structure.grossMargins = data.grossMargins
            structure.ebitdaMargins = data.ebitdaMargins
            structure.operatingMargins = data.operatingMargins
            structure.profitMargins = data.profitMargins
            structure.financialCurrency = data.financialCurrency



            structure.status = "OK"
            financialData.financialData = Object.assign({}, structure)
            resolve(financialData)
        } catch (error) {
            let message = ticker + " in financialData - " + error.toString()
            logError(message)
            reject({
                financialDataStatus: "ERROR",
                financialDataError: message
            })
        }
    }



})

module.exports = financialData