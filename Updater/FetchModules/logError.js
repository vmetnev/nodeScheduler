const mongoose = require('mongoose')
const Schema = mongoose.Schema


const collectionNameForErrorLog = `errorTickerData${new Date().toISOString().slice(0, 10)}`

const ErrorLog = mongoose.model(collectionNameForErrorLog,
    new Schema({
        ticker: String,
        message: String,
    })
)


async function logError(message, ticker) {
    console.log('--------------')
    console.log('Error-')
    console.log(ticker)
    console.log(message)
    console.log('--------------')
    let errorMessage = new ErrorLog({
        ticker: ticker,
        message: message
    })

    errorMessage.save().then(data => {

    })
}

module.exports = logError