const yahooFinance = require('yahoo-finance2').default;
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const logError = require('./logError')


const calendarEvents = (ticker) => new Promise(async (resolve, reject) => {
    let thisError = false
    
    const results = await yahooFinance.quoteSummary(ticker, { modules: ["calendarEvents"] }).catch(error => {
        thisError = true
        let message = ticker + " in calendar events - " + error.toString()
        logError(message, ticker, "calendarEvents")
        reject({
            calendarEventsStatus: "ERROR",
            calendarEventsError: message
        })
    })

    
    

    if (!thisError) {
        try {
            data = results.calendarEvents.earnings
            let structure = {}
            let calendarEvents = {}
            structure.earningsDate = (data.earningsDate[0]) ? new Date(data.earningsDate[0]).toISOString().split("T")[0] : "n.a."
            structure.earningsAverage = data.earningsAverage
            structure.earningsLow = data.earningsLow
            structure.earningsHigh = data.earningsHigh
            structure.revenueAverage = data.revenueAverage
            structure.revenueLow = data.revenueLow
            structure.revenueHigh = data.revenueHigh
            structure.status = "OK"
            calendarEvents.calendarEvents = Object.assign({}, structure)
            
            resolve(calendarEvents)
        } catch (error) {
            let message = ticker + " in calendar events - " + error.toString()
            logError(message, ticker, "calendarEvents")
            reject({
                calendarEventsStatus: "ERROR",
                calendarEventsError: message
            })
        }
    }
})

module.exports = calendarEvents