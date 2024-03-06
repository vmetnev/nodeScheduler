const yahooFinance = require('yahoo-finance2').default;
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const logError = require('./logError')



const recommendationTrend = (ticker) => new Promise(async (resolve, reject) => {
    let thisError = false
    const results = await yahooFinance.quoteSummary(ticker, { modules: ["recommendationTrend"] }).catch(error => {
        thisError = true

        let message = ticker + " in recommendationTrend - " + error.toString()
        logError(message,ticker,"recommendationTrend")
        reject({
            recommendationTrendStatus: "ERROR",
            recommendationTrendError: message
        })
    })

    if (!thisError) {

        try {
            data = results.recommendationTrend.trend
            let structure = {}
            let recommendationTrend = {}

            structure.recPeriod0 = data[0].period
            structure.strongBuy0 = data[0].strongBuy
            structure.buy0 = data[0].buy
            structure.hold0 = data[0].hold
            structure.sell0 = data[0].sell
            structure.strongSell0 = data[0].strongSell

            structure.recPeriodMinus1M = data[1].period
            structure.strongBuyMinus1M = data[1].strongBuy
            structure.buyMinus1M = data[1].buy
            structure.holdMinus1M = data[1].hold
            structure.sellMinus1M = data[1].sell
            structure.strongSellMinus1M = data[1].strongSell

            structure.recPeriodMinus2M = data[2].period
            structure.strongBuyMinus2M = data[2].strongBuy
            structure.buyMinus2M = data[2].buy
            structure.holdMinus2M = data[2].hold
            structure.sellMinus2M = data[2].sell
            structure.strongSellMinus2M = data[2].strongSell

            structure.recPeriodMinus3M = data[3].period
            structure.strongBuyMinus3M = data[3].strongBuy
            structure.buyMinus3M = data[3].buy
            structure.holdMinus3M = data[3].hold
            structure.sellMinus3M = data[3].sell
            structure.strongSellMinus3M = data[3].strongSell


            structure.status = "OK"
            recommendationTrend.recommendationTrend = Object.assign({}, structure)
            resolve(recommendationTrend)
        } catch (error) {
            let message = ticker + " in recommendationTrend - " + error.toString()
            logError(message,ticker,"recommendationTrend")
            reject({
                recommendationTrendStatus: "ERROR",
                recommendationTrendError: message
            })
        }
    }



})


module.exports = recommendationTrend

