const yahooFinance = require('yahoo-finance2').default;
const fs = require('fs')
const path = require('path')
const LoadTicker = require('./Models/LoadTickerModel')

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const {
    Schema
} = mongoose;

const database = {
    uri: "mongodb://127.0.0.1:27017/",
    name: "scheduler",
    user: "",
    password: "",
    options: {},
};

database.collectionName = `tickerData ${new Date().toISOString().slice(0, 10)}`

function mongooseConnect() {
    mongoose.connect(`${database.uri}${database.name}`, database.options).then(
        () => {
            console.log("Mongo connected...")
        },
        err => {
            console.error(err)
        }
    )
}

mongooseConnect()

const Ticker = mongoose.model(
    'tickerData 20240219',
    new Schema({
        ticker: String,
        date: String,
        data: Schema.Types.Mixed,
    })
)

const ErrorLog = mongoose.model(
    'error',
    new Schema({
        ticker: String,
        message: String,
    })
)

// let arr = ['MOS', 'VMC', 'RGLD', 'DD', 'ALB', 'RS', 'OMC', 'WBD', 'FOXA', 'NWS', 'GOOG', 'GOOGL', 'GOOGL', 'META', 'NYT', 'TJX', 'TSLA', 'VFS', 'ALV', 'MHK', 'PDD', 'CART', 'AVY', 'SCI', 'LVS', 'KVUE', 'DAR', 'OZK', 'IBKR', 'EG', 'RVTY', 'DVA', 'MDT', 'COR', 'RGEN', 'TDG', 'HXL', 'PWR', 'VLTO', 'ITT', 'CR', 'FLS', 'LECO', 'LECO', 'XPO', 'WM', 'RSG', 'CLH', 'OHI', 'HR', 'FR', 'NSA', 'ARE', 'ELS', 'UDR', 'KIM', 'BRX', 'AMT', 'WY', 'CSCO', 'HPQ', 'JBL', 'FI', 'TRMB', 'NVDA', 'ARM', 'QRVO', 'QRVO', 'INTU', 'ROP', 'TTD', 'FICO', 'MANH', 'CDAY', 'MNDY', 'DUOL', 'MSFT', 'ZS', 'MDB', 'OKTA', 'DBX', 'ALTR', 'CFLT', 'ENPH', 'DUK']

let arr = ["WY"]
let counter = 0

arr.forEach(ticker => {
    counter = counter + 1000
    setTimeout(() => { getAllData(ticker) }, counter)
})

async function getAllData(input) {

    await Ticker.findOneAndDelete({ ticker: input })

    let tickerInstance = {}

    let ticker = input
    console.log(ticker)
    tickerInstance.ticker = ticker
    tickerInstance.date = new Date().toString()

    const assetProfile = new Promise(async (resolve, reject) => {
        let thisError = false

        const results = await yahooFinance.quoteSummary(ticker, { modules: ["assetProfile"] }).catch(error => {
            thisError = true
            let message = ticker + " in asset profile - " + error.toString()
            logError(message)
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
                logError(message)
                reject({
                    assetProfileStatus: "ERROR",
                    assetProfileError: message
                })
            }
        }
    })

    const calendarEvents = new Promise(async (resolve, reject) => {
        let thisError = false

        const results = await yahooFinance.quoteSummary(ticker, { modules: ["calendarEvents"] }).catch(error => {
            thisError = true
            let message = ticker + " in calendar events - " + error.toString()
            logError(message)
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
                logError(message)
                reject({
                    calendarEventsStatus: "ERROR",
                    calendarEventsError: message
                })
            }
        }
    })

    const fiveYearPriceData = new Promise(async (resolve, reject) => {
        let today = new Date(new Date().toISOString().split('T')[0])
        let dateMinus5Y = (new Date(new Date(today).setDate(new Date(today).getDate() - 366 * 5))).toISOString().split('T')[0]

        ticker = ticker
        const queryOptions = { period1: dateMinus5Y, /* ... */ };
        const data = await yahooFinance.historical(ticker, queryOptions).catch(error => {
            let message = ticker + " in 5 year price data - " + error.toString()
            logError(message)
            reject({
                fiveYearPriceDataStatus: "ERROR",
                fiveYearPriceDataError: message
            })
        })

        let output = []

        try {
            for (let q = 0; q < data.length; q++) {
                output.push([(data[q].date).toISOString().slice(0, 10), data[q].close])
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
            resolve(fiveYearPriceData)
        } catch (error) {
            let message = ticker + " in 5 year price data - " + error.toString()
            logError(message)
            reject({
                fiveYearPriceDataStatus: "ERROR",
                fiveYearPriceDataError: message
            })
        }
    })

    const defaultKeyStatistics = new Promise(async (resolve, reject) => {
        let thisError = false
        const results = await yahooFinance.quoteSummary(ticker, { modules: ["defaultKeyStatistics"] }).catch(error => {
            thisError = true
            let message = ticker + " in defaultKeyStatistics - " + error.toString()
            logError(message)
            reject({
                defaultKeyStatisticsStatus: "ERROR",
                defaultKeyStatisticsError: message
            })
        })

        if (!thisError) {
            try {
                data = results.defaultKeyStatistics
                let structure = {}
                let defaultKeyStatistics = {}

                structure.enterpriseValue = data.enterpriseValue
                structure.forwardPE = data.forwardPE
                structure.profitMargins = data.profitMargins
                structure.floatShares = data.floatShares
                structure.sharesOutstanding = data.sharesOutstanding
                structure.sharesShort = data.sharesShort
                structure.sharesShortPriorMonth = data.sharesShortPriorMonth
                structure.shortRatio = data.shortRatio
                structure.shortPercentOfFloat = data.shortPercentOfFloat
                structure.beta = data.beta
                structure.priceToBook = data.priceToBook

                try {
                    structure.lastFiscalYearEnd = new Date(data.lastFiscalYearEnd).toISOString().split("T")[0]
                } catch (error) {
                    structure.lastFiscalYearEnd = data.lastFiscalYearEnd
                }

                try {
                    structure.nextFiscalYearEnd = new Date(data.nextFiscalYearEnd).toISOString().split("T")[0]
                } catch (error) {
                    structure.nextFiscalYearEnd = data.nextFiscalYearEnd
                }

                try {
                    structure.mostRecentQuarter = new Date(data.mostRecentQuarter).toISOString().split("T")[0]
                } catch (error) {
                    structure.mostRecentQuarter = data.mostRecentQuarter
                }

                structure.netIncomeToCommon = data.netIncomeToCommon
                structure.trailingEps = data.trailingEps
                structure.forwardEps = data.forwardEps
                structure.enterpriseToRevenue = data.enterpriseToRevenue
                structure.enterpriseToEbitda = data.enterpriseToEbitda
                structure["52WeekChange"] = data["52WeekChange"]
                structure.enterpriseToEbitda = data.enterpriseToEbitda
                structure.status = "OK"
                defaultKeyStatistics.defaultKeyStatistics = Object.assign({}, structure)

                resolve(defaultKeyStatistics)
            } catch (error) {
                let message = ticker + " in defaultKeyStatistics - " + error.toString()
                logError(message)
                reject({
                    defaultKeyStatisticsStatus: "ERROR",
                    defaultKeyStatisticsError: message
                })
            }
        }
    })

    const earningsHistory = new Promise(async (resolve, reject) => {
        let thisError = false

        const results = await yahooFinance.quoteSummary(ticker, { modules: ["earningsHistory"] }).catch(error => {
            thisError = true
            let message = ticker + " in earningsHistory - " + error.toString()
            logError(message)
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
                logError(message)
                reject({
                    earningsHistoryStatus: "ERROR",
                    earningsHistoryError: message
                })
            }
        }
    })

    const earningsTrend = new Promise(async (resolve, reject) => {
        let thisError = false

        const results = await yahooFinance.quoteSummary(ticker, { modules: ["earningsTrend"] }).catch(error => {
            thisError = true

            let message = ticker + " in earningsTrend - " + error.toString()
            logError(message)
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
                logError(message)
                reject({
                    earningsTrendStatus: "ERROR",
                    earningsTrendError: message
                })
            }
        }
    })

    const financialData = new Promise(async (resolve, reject) => {
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

    const priceModule = new Promise(async (resolve, reject) => {
        let thisError = false

        const results = await yahooFinance.quoteSummary(ticker, { modules: ["price"] }).catch(error => {
            thisError = true
            let message = ticker + " in priceModule - " + error.toString()
            logError(message)
            reject({
                priceModuleStatus: "ERROR",
                priceModuleError: message
            })
        })

        if (!thisError) {

            try {
                data = results.price
                let structure = {}
                let priceModule = {}

                structure.preMarketChangePercent = (data.preMarketChangePercent) ? data.preMarketChangePercent : 'n.a.'
                structure.preMarketPrice = (data.preMarketPrice) ? data.preMarketPrice : "n.a."
                structure.postMarketPrice = (data.postMarketPrice) ? data.postMarketPrice : 'n.a.'
                structure.regularMarketChangePercent = data.regularMarketChangePercent

                try {
                    structure.regularMarketTime = new Date(data.regularMarketTime).toISOString().split("T")[0] + " - " + new Date(data.regularMarketTime).toISOString().split("T")[1].substring(0, 8);
                } catch (error) {
                    structure.regularMarketTime = data.regularMarketTime
                }

                structure.regularMarketPrice = data.regularMarketPrice
                structure.regularMarketDayHigh = data.regularMarketDayHigh
                structure.regularMarketDayLow = data.regularMarketDayLow
                structure.regularMarketVolume = data.regularMarketVolume
                structure.regularMarketPreviousClose = data.regularMarketPreviousClose
                structure.marketState = data.marketState
                structure.quoteType = data.quoteType
                structure.symbol = data.symbol
                structure.longName = data.longName
                structure.tradingCurrency = data.currency
                structure.marketCap = data.marketCap

                structure.status = "OK"
                priceModule.priceModule = Object.assign({}, structure)
                resolve(priceModule)
            } catch (error) {
                let message = ticker + " in priceModule - " + error.toString()
                logError(message)
                reject({
                    priceModuleStatus: "ERROR",
                    priceModuleError: message
                })
            }
        }
    })

    const priceService = new Promise(async (resolve, reject) => {

        async function getPriceRange(ticker) {// Returns one year price range for performance data
            return new Promise(async (resolve, reject) => {
                let today = new Date(new Date().toISOString().split('T')[0])
                let dateMinus12M = (new Date(new Date(today).setDate(new Date(today).getDate() - 366 * 5))).toISOString().split('T')[0]

                ticker = ticker
                const queryOptions = { period1: dateMinus12M, /* ... */ };

                const data = await yahooFinance.historical(ticker, queryOptions).catch(error => {
                    let message = ticker + " in fetching priceService - " + error.toString()
                    logError(message)
                    reject({
                        priceServiceStatus: "ERROR",
                        priceServiceError: message
                    })
                })

                let output = []
                try {

                    for (let q = 0; q < data.length; q++) {
                        output.push([(data[q].date).toISOString().slice(0, 10), data[q].close])
                    }
                    resolve(output)
                } catch (error) {
                    let message = ticker + " in priceService - " + error.toString()
                    logError(message)
                    reject({
                        priceServiceStatus: "ERROR",
                        priceServiceError: message
                    })
                }
            })
        }



        getPriceRange(ticker).then(data => {
            let lastPrice = data[data.length - 1][1]
            let lastPriceDate = data[data.length - 1][0]
            let lastPriceFullObject = [lastPriceDate, lastPrice]
            let previousDayPrice = data[data.length - 2][1]
            let previousDayDate = data[data.length - 2][0]
            let previousDayFullObject = [previousDayDate, previousDayPrice]
            let today = new Date(new Date(lastPriceDate).toISOString().split('T')[0]).toISOString().split('T')[0]

            let dateMinus7D = new Date((new Date(new Date(today).setDate(new Date(today).getDate() - 7))).toISOString().split('T')[0]).toISOString().split('T')[0]
            let dateMinus1M = new Date((new Date(new Date(today).setDate(new Date(today).getDate() - 30))).toISOString().split('T')[0]).toISOString().split('T')[0]
            let dateMinus3M = new Date((new Date(new Date(today).setDate(new Date(today).getDate() - 91))).toISOString().split('T')[0]).toISOString().split('T')[0]
            let dateMinus6M = new Date((new Date(new Date(today).setDate(new Date(today).getDate() - 182))).toISOString().split('T')[0]).toISOString().split('T')[0]
            let dateMinus12M = new Date((new Date(new Date(today).setDate(new Date(today).getDate() - 365))).toISOString().split('T')[0]).toISOString().split('T')[0]
            let dateYTD = `${new Date().getFullYear() - 1}-12-31`


            const { fullObject: dateMinus7DFullObject, date: dateMinus7DDate, price: dateMinus7DPrice } = extractDateAndPrice(dateMinus7D)
            const { fullObject: dateMinus1MFullObject, date: dateMinus1MDate, price: dateMinus1MPrice } = extractDateAndPrice(dateMinus1M)
            const { fullObject: dateMinus3MFullObject, date: dateMinus3MDate, price: dateMinus3MPrice } = extractDateAndPrice(dateMinus3M)
            const { fullObject: dateMinus6MFullObject, date: dateMinus6MDate, price: dateMinus6MPrice } = extractDateAndPrice(dateMinus6M)
            const { fullObject: dateMinus12MFullObject, date: dateMinus12MDate, price: dateMinus12MPrice } = extractDateAndPrice(dateMinus12M)
            const { fullObject: dateYTDFullObject, date: dateYTDDate, price: dateYTDPrice } = extractDateAndPrice(dateYTD)
            const [low52FullObject, low52Date, low52Price, high52FullObject, high52Date, high52Price] = weeks52(data)

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
            resolve(priceObject)

            function extractDateAndPrice(target) {
                counter = data.length
                target = target
                while (counter > -1) {
                    counter--
                    if (counter === -1) break
                    if (data[counter][0] === target || new Date(data[counter][0]).valueOf() < new Date(target).valueOf()) break
                }
                if (counter > -1) {
                    return {
                        fullObject: data[counter],
                        date: data[counter][0],
                        price: data[counter][1]
                    }
                } else {
                    return {
                        fullObject: "n.a",
                        date: "n.a",
                        price: "n.a"
                    }
                }



            }
        })

        // .catch(error => {

        //     let message = ticker + " in priceService - " + error.toString()
        //     logError(message)
        //     reject({
        //         priceServiceStatus: "ERROR",
        //         priceServiceError: message
        //     })
        // })

        function weeks52(data) {
            let lowObj = {}
            let highObj = {}
            lowObj.date = data[0][0]
            lowObj.price = parseFloat(data[0][1])
            highObj.date = data[0][0]
            highObj.price = parseFloat(data[0][1])
            for (let q = 0; q < data.length; q++) {
                if (data[q][1] < lowObj.price) {
                    lowObj.date = data[q][0]
                    lowObj.price = parseFloat(data[q][1])
                }
                if (data[q][1] > highObj.price) {
                    highObj.date = data[q][0]
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
    })

    const recommendationTrend = new Promise(async (resolve, reject) => {
        let thisError = false

        const results = await yahooFinance.quoteSummary(ticker, { modules: ["recommendationTrend"] }).catch(error => {
            thisError = true

            let message = ticker + " in recommendationTrend - " + error.toString()
            logError(message)
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
                logError(message)
                reject({
                    recommendationTrendStatus: "ERROR",
                    recommendationTrendError: message
                })
            }
        }
    })

    const summaryDetail = new Promise(async (resolve, reject) => {
        let thisError = false

        const results = await yahooFinance.quoteSummary(ticker, { modules: ["summaryDetail"] }).catch(error => {
            thisError = true

            let message = ticker + " in summaryDetail - " + error.toString()
            logError(message)
            reject({
                summaryDetailStatus: "ERROR",
                summaryDetailError: message
            })
        })

        if (!thisError) {

            try {
                data = results.summaryDetail
                let structure = {}
                let summaryDetail = {}

                structure.averageDailyVolume10Day = data.averageDailyVolume10Day
                structure.summaryBeta = data.beta
                structure.dayHigh = data.dayHigh
                structure.dayLow = data.dayLow
                structure.dividendRate = data.dividendRate
                structure.dividendYield = data.dividendYield
                structure.fiftyDayAverage = data.fiftyDayAverage
                structure.fiftyTwoWeekHigh = data.fiftyTwoWeekHigh
                structure.fiftyTwoWeekLow = data.fiftyTwoWeekLow
                structure.fiveYearAvgDividendYield = data.fiveYearAvgDividendYield
                structure.summaryForwardPE = data.forwardPE
                structure.summaryMarketCap = data.marketCap
                structure.openPrice = data['open']
                structure.payoutRatio = data.payoutRatio
                structure.previousClose = data.previousClose
                structure.summaryRegularMarketDayHigh = data.regularMarketDayHigh
                structure.summaryRegularMarketDayLow = data.regularMarketDayLow
                structure.regularMarketOpen = data.regularMarketOpen
                structure.summaryRegularMarketPreviousClose = data.regularMarketPreviousClose
                structure.trailingAnnualDividendRate = data.trailingAnnualDividendRate
                structure.trailingAnnualDividendYield = data.trailingAnnualDividendYield
                structure.trailingPE = data.trailingPE
                structure.twoHundredDayAverage = data.twoHundredDayAverage


                structure.status = "OK"
                summaryDetail.summaryDetail = Object.assign({}, structure)
                resolve(summaryDetail)
            } catch (error) {
                let message = ticker + " in summaryDetail - " + error.toString()
                logError(message)
                reject({
                    summaryDetailStatus: "ERROR",
                    summaryDetailError: message
                })
            }
        }
    })

    const upgradeDowngradeHistory = new Promise(async (resolve, reject) => {
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

    //---------------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------------

    async function logError(message) {
        let errorMessage = new ErrorLog({
            ticker: ticker,
            message: message
        })

        errorMessage.save().then(data => {

        })
    }

    const promises = [
        assetProfile,
        calendarEvents,
        fiveYearPriceData,
        defaultKeyStatistics,
        earningsHistory,
        earningsTrend,
        financialData,
        priceModule,
        priceService,
        recommendationTrend,
        summaryDetail,
        upgradeDowngradeHistory,
    ]

    Promise.allSettled(promises).then((results) => {
        results.forEach((result) => {

            if (result.status === "fulfilled") {
                Object.assign(tickerInstance, result.value)
            } else {
                Object.assign(tickerInstance, result.reason)
            }
        })


        let ticker = new Ticker()
        ticker.ticker = tickerInstance.ticker
        ticker.data = tickerInstance

        ticker.save().then(data => {
            console.log(`saved ${ticker.ticker}`)

        })
    }
    );
}


