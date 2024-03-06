const yahooFinance = require('yahoo-finance2').default;
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const logError = require('./logError')

const earningsTrend = (ticker) => new Promise(async (resolve, reject) => {
    let thisError = false
    const results = await yahooFinance.quoteSummary(ticker, { modules: ["earningsTrend"] }).catch(error => {
        thisError = true

        let message = ticker + " in earningsTrend - " + error.toString()
        logError(message,ticker,"earningsTrend")
        reject({
            earningsTrendStatus: "ERROR",
            earningsTrendError: message
        })
    })

    if (!thisError) {

        try {
            data = results.earningsTrend.trend
            let structure = {}
            let earningsTrend = {}

            structure.earningsPeriodY0 = data[2].period
            structure.earningsEndDateY0 = new Date(data[2].endDate).toISOString().split('T')[0]
            structure.earningsEstimateAverageY0 = data[2].earningsEstimate.avg
            structure.yearAgoEPSY0 = data[2].earningsEstimate.yearAgoEps
            structure.earningsEstimateGrowthY0 = data[2].earningsEstimate.growth
            structure.numberOfAnalystsEpsEstimateY0 = data[2].earningsEstimate.numberOfAnalysts
            structure.revenueEstimateAverageY0 = data[2].revenueEstimate.avg
            structure.yearAgoRevenueY0 = data[2].revenueEstimate.yearAgoRevenue
            structure.revenueEstimateGrowthY0 = data[2].revenueEstimate.growth
            structure.numberOfAnalystsRevenueEstimateY0 = data[2].revenueEstimate.numberOfAnalysts
            structure.epsTrendCurrentY0 = data[2].epsTrend.current
            structure.epsTrend7DaysAgoY0 = data[2].epsTrend['7daysAgo']
            structure.epsTrend30DaysAgoY0 = data[2].epsTrend['30daysAgo']
            structure.epsTrend90DaysAgoY0 = data[2].epsTrend['90daysAgo']

            structure.earningsPeriodY1 = data[3].period
            structure.earningsEndDateY1 = new Date(data[3].endDate).toISOString().split('T')[0]
            structure.earningsEstimateAverageY1 = data[3].earningsEstimate.avg
            structure.yearAgoEPSY1 = data[3].earningsEstimate.yearAgoEps
            structure.earningsEstimateGrowthY1 = data[3].earningsEstimate.growth
            structure.numberOfAnalystsEpsEstimateY1 = data[3].earningsEstimate.numberOfAnalysts
            structure.revenueEstimateAverageY1 = data[3].revenueEstimate.avg
            structure.yearAgoRevenueY1 = data[3].revenueEstimate.yearAgoRevenue
            structure.revenueEstimateGrowthY1 = data[3].revenueEstimate.growth
            structure.numberOfAnalystsRevenueEstimateY1 = data[3].revenueEstimate.numberOfAnalysts
            structure.epsTrendCurrentY1 = data[3].epsTrend.current
            structure.epsTrend7DaysAgoY1 = data[3].epsTrend['7daysAgo']
            structure.epsTrend30DaysAgoY1 = data[3].epsTrend['30daysAgo']
            structure.epsTrend90DaysAgoY1 = data[3].epsTrend['90daysAgo']

            structure.earningsPeriodQ0 = data[0].period
            structure.earningsEndDateQ0 = new Date(data[0].endDate).toISOString().split('T')[0]
            structure.earningsEstimateAverageQ0 = data[0].earningsEstimate.avg
            structure.yearAgoEPSQ0 = data[0].earningsEstimate.yearAgoEps
            structure.earningsEstimateGrowthQ0 = data[0].earningsEstimate.growth
            structure.numberOfAnalystsEpsEstimateQ0 = data[0].earningsEstimate.numberOfAnalysts
            structure.revenueEstimateAverageQ0 = data[0].revenueEstimate.avg
            structure.yearAgoRevenueQ0 = data[0].revenueEstimate.yearAgoRevenue
            structure.revenueEstimateGrowthQ0 = data[0].revenueEstimate.growth
            structure.numberOfAnalystsRevenueEstimateQ0 = data[0].revenueEstimate.numberOfAnalysts
            structure.epsTrendCurrentQ0 = data[0].epsTrend.current
            structure.epsTrend7DaysAgoQ0 = data[0].epsTrend['7daysAgo']
            structure.epsTrend30DaysAgoQ0 = data[0].epsTrend['30daysAgo']
            structure.epsTrend90DaysAgoQ0 = data[0].epsTrend['90daysAgo']

            structure.earningsPeriodQ1 = data[1].period
            structure.earningsEndDateQ1 = new Date(data[1].endDate).toISOString().split('T')[0]
            structure.earningsEstimateAverageQ1 = data[1].earningsEstimate.avg
            structure.yearAgoEPSQ1 = data[1].earningsEstimate.yearAgoEps
            structure.earningsEstimateGrowthQ1 = data[1].earningsEstimate.growth
            structure.numberOfAnalystsEpsEstimateQ1 = data[1].earningsEstimate.numberOfAnalysts
            structure.revenueEstimateAverageQ1 = data[1].revenueEstimate.avg
            structure.yearAgoRevenueQ1 = data[1].revenueEstimate.yearAgoRevenue
            structure.revenueEstimateGrowthQ1 = data[1].revenueEstimate.growth
            structure.numberOfAnalystsRevenueEstimateQ1 = data[1].revenueEstimate.numberOfAnalysts
            structure.epsTrendCurrentQ1 = data[1].epsTrend.current
            structure.epsTrend7DaysAgoQ1 = data[1].epsTrend['7daysAgo']
            structure.epsTrend30DaysAgoQ1 = data[1].epsTrend['30daysAgo']
            structure.epsTrend90DaysAgoQ1 = data[1].epsTrend['90daysAgo']


            structure.status = "OK"
            earningsTrend.earningsTrend = Object.assign({}, structure)

            resolve(earningsTrend)
        } catch (error) {
            let message = ticker + " in earningsTrend - " + error.toString()
            logError(message,ticker,"earningsTrend")
            reject({
                earningsTrendStatus: "ERROR",
                earningsTrendError: message
            })
        }
    }



})


module.exports = earningsTrend