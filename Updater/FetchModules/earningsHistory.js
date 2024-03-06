const yahooFinance = require('yahoo-finance2').default;
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const logError = require('./logError')

const earningsHistory = (ticker) => new Promise(async (resolve, reject) => {
    let thisError = false

    const results = await yahooFinance.quoteSummary(ticker, { modules: ["earningsHistory"] }).catch(error => {
        thisError = true
        let message = ticker + " in earningsHistory - " + error.toString()
        logError(message,ticker,"earningsHistory")
        reject({
            earningsHistoryStatus: "ERROR",
            earningsHistoryError: message
        })
    })

    if (!thisError) {
        try {
            data = results.earningsHistory.history
            let structure = {}
            let earningsHistory = {}
            structure.earnHistPeriodMinus1Q = data[3].period
            structure.earnHistQuarterEndMinus1Q = new Date(data[3].quarter).toISOString().split('T')[0]
            structure.earnHistEpsActualMinus1Q = data[3].epsActual
            structure.earnHistEpsEstimateMinus1Q = data[3].epsEstimate
            structure.earnHistDiffMinus1Q = data[3].surprisePercent

            structure.earnHistPeriodMinus2Q = data[2].period
            structure.earnHistQuarterEndMinus2Q = new Date(data[2].quarter).toISOString().split('T')[0]
            structure.earnHistEpsActualMinus2Q = data[2].epsActual
            structure.earnHistEpsEstimateMinus2Q = data[2].epsEstimate
            structure.earnHistDiffMinus2Q = data[2].surprisePercent

            structure.earnHistPeriodMinus3Q = data[1].period
            structure.earnHistQuarterEndMinus3Q = new Date(data[1].quarter).toISOString().split('T')[0]
            structure.earnHistEpsActualMinus3Q = data[1].epsActual
            structure.earnHistEpsEstimateMinus3Q = data[1].epsEstimate
            structure.earnHistDiffMinus3Q = data[1].surprisePercent

            structure.earnHistPeriodMinus4Q = data[0].period
            structure.earnHistQuarterEndMinus4Q = new Date(data[0].quarter).toISOString().split('T')[0]
            structure.earnHistEpsActualMinus4Q = data[0].epsActual
            structure.earnHistEpsEstimateMinus4Q = data[0].epsEstimate
            structure.earnHistDiffMinus4Q = data[0].surprisePercent

            structure.status = "OK"
            earningsHistory.earningsHistory = Object.assign({}, structure)
            resolve(earningsHistory)
        } catch (error) {
            let message = ticker + " in earningsHistory - " + error.toString()
            logError(message,ticker,"earningsHistory")
            reject({
                earningsHistoryStatus: "ERROR",
                earningsHistoryError: message
            })
        }
    }



})


module.exports = earningsHistory