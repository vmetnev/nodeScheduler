const yahooFinance = require('yahoo-finance2').default;
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const logError = require('./logError')



const upgradeDowngradeHistory = (ticker) => new Promise(async (resolve, reject) => {
    let thisError = false
    const results = await yahooFinance.quoteSummary(ticker, { modules: ["upgradeDowngradeHistory"] }).catch(error => {
        thisError = true

        let message = ticker + " in upgradeDowngradeHistory - " + error.toString()
        logError(message)
        reject({
            upgradeDowngradeHistoryStatus: "ERROR",
            upgradeDowngradeHistoryError: message
        })
    })

    if (!thisError) {

        try {
            data = results.upgradeDowngradeHistory.history
            let structure = {}

            structure.history = data.slice(0, 20)
            let upgradeDowngradeHistory = {}
            structure.status = "OK"
            upgradeDowngradeHistory.upgradeDowngradeHistory = Object.assign({}, structure)
            resolve(upgradeDowngradeHistory)
        } catch (error) {
            let message = ticker + " in upgradeDowngradeHistory - " + error.toString()
            logError(message)
            reject({
                upgradeDowngradeHistoryStatus: "ERROR",
                upgradeDowngradeHistoryError: message
            })
        }
    }
})


module.exports = upgradeDowngradeHistory


