const mongoose = require('mongoose')
const Schema = mongoose.Schema
const status = require('../Controllers/statusController')

const collectionNameForErrorLog = `errorTickerData${new Date().toISOString().slice(0, 10)}`

const ErrorLog = mongoose.model(collectionNameForErrorLog,
    new Schema({
        ticker: String,
        message: String,
        moduleOrProcedure: String,
        timeStamp: {
            type: String,
            default: new Date().toString().slice(0, 24)
        }
    })
)

async function logError(message, ticker, moduleOrProcedure) {
    console.log('--------------')
    console.log('Error-')
    console.log(ticker)
    console.log(message)
    console.log('--------------')

    status.addErrorTicker(ticker)
    status.addError(message)


    let errorLog = new ErrorLog({
        ticker: ticker,
        message: message,
        moduleOrProcedure: moduleOrProcedure
    })

    await errorLog.save()
}

module.exports = logError