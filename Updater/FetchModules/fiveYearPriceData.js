const yahooFinance = require('yahoo-finance2').default;
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const logError = require('./logError')

let output12M = []

const fiveYearPriceData = (ticker) => new Promise(async (resolve, reject) => {
    let thisError = false
    let today = new Date(new Date().toISOString().split('T')[0])
    let dateMinus5Y = (new Date(new Date(today).setDate(new Date(today).getDate() - 366 * 5))).toISOString().split('T')[0]
    let dateMinus12M = (new Date(new Date(today).setDate(new Date(today).getDate() - 368))).toISOString().split('T')[0]


    ticker = ticker
    const queryOptions = { period1: dateMinus5Y, /* ... */ };
    const data = await yahooFinance.historical(ticker, queryOptions).catch(error => {
        let message = ticker + " in 5 year price data - " + error.toString()
        logError(message, ticker, "fiveYearPriceData")
        reject({
            fiveYearPriceDataStatus: "ERROR",
            fiveYearPriceDataError: message
        })
    })

    let output = []
    output12M = []

    try {
        for (let q = 0; q < data.length; q++) {
            output.push([(data[q].date).toISOString().slice(0, 10), data[q].close])

            if (new Date(data[q].date).valueOf() >= new Date(dateMinus12M).valueOf()) {
                output12M.push([(data[q].date).toISOString().slice(0, 10), data[q].close])
            }
        }



        let min = data[0].close
        let max = data[0].close

        for (let q = 0; q < data.length; q++) {
            if (data[q].close < min) min = data[q].close
            if (data[q].close > max) max = data[q].close
        }

        let fiveYearPriceData = {}
        fiveYearPriceData.fiveYearPriceData = {}
        fiveYearPriceData.fiveYearPriceData.data = output

        fiveYearPriceData.fiveYearPriceData.min = min
        fiveYearPriceData.fiveYearPriceData.max = max

        fiveYearPriceData.fiveYearPriceData.status = 'OK'



        let data12M = output12M

        let lastPrice = data12M[data12M.length - 1][1]
        let lastPriceDate = data12M[data12M.length - 1][0]
        let lastPriceFullObject = [lastPriceDate, lastPrice]
        let previousDayPrice = data12M[data12M.length - 2][1]
        let previousDayDate = data12M[data12M.length - 2][0]
        let previousDayFullObject = [previousDayDate, previousDayPrice]


        let dateMinus7D = new Date((new Date(new Date(today).setDate(new Date(today).getDate() - 7))).toISOString().split('T')[0]).toISOString().split('T')[0]
        let dateMinus1M = new Date((new Date(new Date(today).setDate(new Date(today).getDate() - 30))).toISOString().split('T')[0]).toISOString().split('T')[0]
        let dateMinus3M = new Date((new Date(new Date(today).setDate(new Date(today).getDate() - 91))).toISOString().split('T')[0]).toISOString().split('T')[0]
        let dateMinus6M = new Date((new Date(new Date(today).setDate(new Date(today).getDate() - 182))).toISOString().split('T')[0]).toISOString().split('T')[0]
        dateMinus12M = new Date((new Date(new Date(today).setDate(new Date(today).getDate() - 365))).toISOString().split('T')[0]).toISOString().split('T')[0]
        let dateYTD = `${new Date().getFullYear() - 1}-12-31`


        const { fullObject: dateMinus7DFullObject, date: dateMinus7DDate, price: dateMinus7DPrice } = extractDateAndPrice(dateMinus7D)
        const { fullObject: dateMinus1MFullObject, date: dateMinus1MDate, price: dateMinus1MPrice } = extractDateAndPrice(dateMinus1M)
        const { fullObject: dateMinus3MFullObject, date: dateMinus3MDate, price: dateMinus3MPrice } = extractDateAndPrice(dateMinus3M)
        const { fullObject: dateMinus6MFullObject, date: dateMinus6MDate, price: dateMinus6MPrice } = extractDateAndPrice(dateMinus6M)
        const { fullObject: dateMinus12MFullObject, date: dateMinus12MDate, price: dateMinus12MPrice } = extractDateAndPrice(dateMinus12M)
        const { fullObject: dateYTDFullObject, date: dateYTDDate, price: dateYTDPrice } = extractDateAndPrice(dateYTD)
        const [low52FullObject, low52Date, low52Price, high52FullObject, high52Date, high52Price] = weeks52(data12M)

        let perf1D = ((lastPrice / previousDayPrice - 1) * 100).toFixed(2) + "%"
        let perf1W = ((lastPrice / dateMinus7DPrice - 1) * 100).toFixed(2) + "%"
        let perf1M = ((lastPrice / dateMinus1MPrice - 1) * 100).toFixed(2) + "%"
        let perf3M = ((lastPrice / dateMinus3MPrice - 1) * 100).toFixed(2) + "%"
        let perf6M = ((lastPrice / dateMinus6MPrice - 1) * 100).toFixed(2) + "%"
        let perf12M = ((lastPrice / dateMinus12MPrice - 1) * 100).toFixed(2) + "%"
        let perfYTD = ((lastPrice / dateYTDPrice - 1) * 100).toFixed(2) + "%"

        let structure = {
            ['dateMinus7DDate']: dateMinus7DDate,
            ['dateMinus7DPrice']: dateMinus7DPrice,
            ['dateMinus1MDate']: dateMinus1MDate,
            ['dateMinus1MPrice']: dateMinus1MPrice,
            ['dateMinus3MDate']: dateMinus3MDate,
            ['dateMinus3MPrice']: dateMinus3MPrice,
            ['dateMinus6MDate']: dateMinus6MDate,
            ['dateMinus6MPrice']: dateMinus6MPrice,
            ['dateMinus12MDate']: dateMinus12MDate,
            ['dateMinus12MPrice']: dateMinus12MPrice,
            ['dateYTDDate']: dateYTDDate,
            ['dateYTDPrice']: dateYTDPrice,
            ['lastPriceDate']: lastPriceDate,
            ['lastPrice']: lastPrice,
            ['previousDayPrice']: previousDayPrice,
            ['previousDayDate']: previousDayDate,
            ['perf1D']: perf1D,
            ['perf1W']: perf1W,
            ['perf1M']: perf1M,
            ['perf3M']: perf3M,
            ['perf6M']: perf6M,
            ['perf12M']: perf12M,
            ['perfYTD']: perfYTD,
            ['low52Date']: low52Date,
            ['low52Price']: low52Price,
            ['high52Date']: high52Date,
            ['high52Price']: high52Price,
            status: "OK"
        }
        let priceObject = {}
        priceObject.priceObject = structure


        function extractDateAndPrice(target) {
            counter = data12M.length
            target = target
            do {
                counter--
                if (data12M[counter][0] === target || new Date(data12M[counter][0]).valueOf() < new Date(target).valueOf()) break
            } while (counter > 0)

            return {
                fullObject: data12M[counter],
                date: data12M[counter][0],
                price: data12M[counter][1]
            }
        }


        function weeks52(data12M) {
            let lowObj = {}
            let highObj = {}
            lowObj.date = data12M[0][0]
            lowObj.price = parseFloat(data12M[0][1])
            highObj.date = data12M[0][0]
            highObj.price = parseFloat(data12M[0][1])
            for (let q = 0; q < data12M.length; q++) {
                if (data12M[q][1] < lowObj.price) {
                    lowObj.date = data12M[q][0]
                    lowObj.price = parseFloat(data12M[q][1])
                }
                if (data12M[q][1] > highObj.price) {
                    highObj.date = data12M[q][0]
                    highObj.price = parseFloat(data[q][1])
                }
            }
            return [
                lowObj,
                lowObj.date,
                lowObj.price,
                highObj,
                highObj.date,
                highObj.price,
            ]
        }


        resolve([fiveYearPriceData, priceObject])
    }
    catch (error) {
        console.log(error)
        let message = "PPPP" + ticker + " in 5 year price data - " + error.toString()
            , ticker

        logError(message, ticker, "fiveYearPriceData")
        reject({
            fiveYearPriceDataStatus: "ERROR",
            fiveYearPriceDataError: message
        })
    }

})


module.exports = fiveYearPriceData




