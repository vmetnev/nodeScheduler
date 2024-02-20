const { secEdgarApi } = require('sec-edgar-api')
const yahooFinance = require('yahoo-finance2').default;
const fs = require('fs')
const path = require('path')
const LoadTicker = require('./Models/LoadTickerModel')
const Report = require('./Models/ReportModel')


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

database.collectionName = 'reportsData'

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

const errorReports = mongoose.model(
    'errorReports',
    new Schema({
        ticker: String,
        error: String,
        date: {
            type: Date,
            default: Date.now
        }
    })
)

let counter = 0

updateReports()

async function updateReports() {
    let data = await LoadTicker.find({}, 'ticker -_id')


    for (let q = 1; q < data.length; q++) {
        let instance = data[q]

        let contender = {}
        contender.ticker = instance.ticker

        let additionalDelay = (q % 100 === 0) ? 15000 : 0
        setTimeout(() => {
            console.log(q)
            leadReportsForSingleTicker(contender.ticker)
        }, 1000 * q + additionalDelay)
    }
}

// do delay for delay = delay +2000 *Math.random() + additionalDelay (fired on every 100th instance)

async function leadReportsForSingleTicker(ticker) {

    try {
        console.log(ticker)

        let send = false

        let reports = {}

        try {
            reports = await secEdgarApi.getReports({ symbol: ticker }).catch(error => {
                console.log(error)
                console.log('-----------------------------------')
                send = true

                let err = new errorReports({
                    ticker: ticker,
                    error: 'error in fetch for ticker ' + ticker + " " + error
                })

                err.save().then(data => { }).catch(error => {
                    console.log(error)
                })

                return
            })
            if (send === true) {
                return
            }
        } catch (error) {
            console.log(error)

            let err = new errorReports({
                ticker: ticker,
                error: 'error in fetch for ticker ' + ticker + " " + error
            })

            err.save().then(data => { }).catch(error => {
                console.log(error)
            })



            if (send === true) {
                return
            }
            return
        }


        let output = []

        if (reports) {

            for (let q = reports.length - 1; q > -1; q--) {

                if (reports[q].fiscalPeriod === "FY") {
                    let instance = {}
                    instance.dateReport = (reports[q].dateReport) ? reports[q].dateReport : 0
                    instance.fiscalYear = (reports[q].fiscalYear) ? reports[q].fiscalYear : 0
                    instance.revenueTotal = (reports[q].revenueTotal) ? reports[q].revenueTotal : 0
                    instance.ebit = (reports[q].ebit) ? reports[q].ebit : 0
                    instance.eps = (reports[q].eps) ? reports[q].eps : 0
                    output.push(instance)
                }
            }

            dateReportY0 = (output[0] && output[0]?.dateReport) ? output[0].dateReport : 0
            fiscalYearY0 = (output[0] && output[0]?.fiscalYear) ? output[0].fiscalYear : 0
            revenueY0 = (output[0] && output[0]?.revenueTotal) ? output[0].revenueTotal : 0
            ebitY0 = (output[0] && output[0]?.ebit) ? output[0].ebit : 0
            epsY0 = (output[0] && output[0]?.eps) ? output[0].eps : 0

            dateReportY1 = (output[1] && output[1]?.dateReport) ? output[1].dateReport : 0
            fiscalYearY1 = (output[1] && output[1]?.fiscalYear) ? output[1].fiscalYear : 0
            revenueY1 = (output[1] && output[1]?.revenueTotal) ? output[1].revenueTotal : 0
            ebitY1 = (output[1] && output[1]?.ebit) ? output[1].ebit : 0
            epsY1 = (output[1] && output[1]?.eps) ? output[1].eps : 0

            dateReportY2 = (output[2] && output[2]?.dateReport) ? output[2].dateReport : 0
            fiscalYearY2 = (output[2] && output[2]?.fiscalYear) ? output[2].fiscalYear : 0
            revenueY2 = (output[2] && output[2]?.revenueTotal) ? output[2].revenueTotal : 0
            ebitY2 = (output[2] && output[2]?.ebit) ? output[2].ebit : 0
            epsY2 = (output[2] && output[2]?.eps) ? output[2].eps : 0

            dateReportY3 = (output[3] && output[3]?.dateReport) ? output[3].dateReport : 0
            fiscalYearY3 = (output[3] && output[3]?.fiscalYear) ? output[3].fiscalYear : 0
            revenueY3 = (output[3] && output[3]?.revenueTotal) ? output[3].revenueTotal : 0
            ebitY3 = (output[3] && output[3]?.ebit) ? output[3].ebit : 0
            epsY3 = (output[3] && output[3]?.eps) ? output[3].eps : 0

            dateReportY4 = (output[4] && output[4]?.dateReport) ? output[4].dateReport : 0
            fiscalYearY4 = (output[4] && output[4]?.fiscalYear) ? output[4].fiscalYear : 0
            revenueY4 = (output[4] && output[4]?.revenueTotal) ? output[4].revenueTotal : 0
            ebitY4 = (output[4] && output[4]?.ebit) ? output[4].ebit : 0
            epsY4 = (output[4] && output[4]?.eps) ? output[4].eps : 0

            dateReportY5 = (output[5] && output[5]?.dateReport) ? output[5].dateReport : 0
            fiscalYearY5 = (output[5] && output[5]?.fiscalYear) ? output[5].fiscalYear : 0
            revenueY5 = (output[5] && output[5]?.revenueTotal) ? output[5].revenueTotal : 0
            ebitY5 = (output[5] && output[5]?.ebit) ? output[5].ebit : 0
            epsY5 = (output[5] && output[5]?.eps) ? output[5].eps : 0

            let textReport = {
                ticker: ticker,
                dateReportY0: dateReportY0,
                fiscalYearY0: fiscalYearY0,
                revenueY0: revenueY0,
                ebitY0: ebitY0,
                epsY0: epsY0,
                dateReportY1: dateReportY1,
                fiscalYearY1: fiscalYearY1,
                revenueY1: revenueY1,
                ebitY1: ebitY1,
                epsY1: epsY1,
                dateReportY2: dateReportY2,
                fiscalYearY2: fiscalYearY2,
                revenueY2: revenueY2,
                ebitY2: ebitY2,
                epsY2: epsY2,
                dateReportY3: dateReportY3,
                fiscalYearY3: fiscalYearY3,
                revenueY3: revenueY3,
                ebitY3: ebitY3,
                epsY3: epsY3,
                dateReportY4: dateReportY4,
                fiscalYearY4: fiscalYearY4,
                revenueY4: revenueY4,
                ebitY4: ebitY4,
                epsY4: epsY4,
                dateReportY5: dateReportY5,
                fiscalYearY5: fiscalYearY5,
                revenueY5: revenueY5,
                ebitY5: ebitY5,
                epsY5: epsY5,
            }

            textReport = JSON.stringify(textReport)

            fs.appendFileSync('popcorn.txt', `${textReport}\n`, "utf-8")

            counter++


            let report = new Report({
                ticker: ticker,

                dateReportY0: dateReportY0,
                fiscalYearY0: fiscalYearY0,
                revenueY0: revenueY0,
                ebitY0: ebitY0,
                epsY0: epsY0,

                dateReportY1: dateReportY1,
                fiscalYearY1: fiscalYearY1,
                revenueY1: revenueY1,
                ebitY1: ebitY1,
                epsY1: epsY1,

                dateReportY2: dateReportY2,
                fiscalYearY2: fiscalYearY2,
                revenueY2: revenueY2,
                ebitY2: ebitY2,
                epsY2: epsY2,

                dateReportY3: dateReportY3,
                fiscalYearY3: fiscalYearY3,
                revenueY3: revenueY3,
                ebitY3: ebitY3,
                epsY3: epsY3,

                dateReportY4: dateReportY4,
                fiscalYearY4: fiscalYearY4,
                revenueY4: revenueY4,
                ebitY4: ebitY4,
                epsY4: epsY4,

                dateReportY5: dateReportY5,
                fiscalYearY5: fiscalYearY5,
                revenueY5: revenueY5,
                ebitY5: ebitY5,
                epsY5: epsY5,
            })

            report.save().then(data => {
                console.log('saving ' + ticker)

            }).catch(error => {
                console.log("error in save")
                console.log(ticker)
                console.log(error)
                console.log(data)

                let err = new errorReports({
                    ticker: ticker,
                    error: 'error in save for ticker ' + ticker + " " + error
                })

                err.save().then(data => { }).catch(error => {
                    console.log(error)
                })
            })




        } else {
            console.log('no reports')
        }
    } catch (error) {
        console.log(error)

        let err = new errorReports({
            ticker: ticker,
            error: 'error in the whole function ' + ticker + " " + error
        })

        err.save().then(data => { }).catch(error => {
            console.log(error)

            let err = new errorReports({
                ticker: ticker,
                error: 'error in save error for the whole function ' + ticker + " " + error
            })

            err.save().then(data => { }).catch(error => {
                console.log(error)
            })

        })
    }


}


module.exports = updateReports