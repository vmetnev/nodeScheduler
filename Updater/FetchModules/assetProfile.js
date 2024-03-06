const yahooFinance = require('yahoo-finance2').default;
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const logError = require('./logError')



const assetProfile = (ticker) => new Promise(async (resolve, reject) => {
    let thisError = false

    const results = await yahooFinance.quoteSummary(ticker, { modules: ["assetProfile"] }).catch(error => {
        thisError = true
        let message = ticker + " in asset profile - " + error.toString()
        logError(message, ticker,"assetProfile")
        reject({
            assetProfileStatus: "ERROR",
            assetProfileError: message
        })
    })

    if (!thisError) {

        try {
            data = results.assetProfile
            let structure = {}
            let assetProfile = {}
            structure.country = data.country
            structure.industry = data.industry
            structure.sector = data.sector
            structure.website = data.website
            structure.longBusinessSummary = data.longBusinessSummary
            structure.fullTimeEmployees = data.fullTimeEmployees
            structure.status = "OK"
            assetProfile.assetProfile = Object.assign({}, structure)
            resolve(assetProfile)
        } catch (error) {
            let message = ticker + " in asset profile - " + error.toString()
            logError(message, ticker,"assetProfile")
            reject({
                assetProfileStatus: "ERROR",
                assetProfileError: message
            })
        }
    }
})


module.exports = assetProfile