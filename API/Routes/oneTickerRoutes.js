'use strict'

const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.set("strictQuery", false);

const database = {
    uri: "mongodb://127.0.0.1:27017/",
    name: "scheduler",
    user: "",
    password: "",
    options: {},
};

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

database.collectionName = 'shortlistoftickers'

const LoadTicker = mongoose.model(
    database.collectionName,
    new Schema({

        spx: Boolean,
        ccmp: Boolean,
        mid: Boolean,
        sml: Boolean,

        ticker: String,
        tickerType: String,
        companyName: String,
        sector: String,
        industry: String,
        mc: Number,
        description: String,

        lessThen1: Boolean,
        from1to10: Boolean,
        from10to40: Boolean,
        from40to100: Boolean,
        from100to500: Boolean,
        from500: Boolean,

    }, { strict: false })
)



const getOneTicker = require('../Loaders/loadOneTicker')
const indexData = require('../Loaders/loadIndexData')
const etfData = require('../Loaders/loadETFData')

router.get('/getOneTicker', async (req, res) => {
    console.log(req.query)
    console.log('getone ticker')
    let target = await getOneTicker(req.query.ticker)
    if (target) {
        res.json(target)
    } else {
        res.json('n.a.')
    }
})

router.get('/getIndexData', async (req, res) => {
    console.log(req.query)
    console.log('getone index')
    let target = await indexData(req.query.ticker)
    if (target) {
        res.json(target)
    } else {
        res.json('n.a.')
    }
})


router.get('/getETFData', async (req, res) => {
    console.log(req.query)
    let target = await etfData(req.query.ticker)
    if (target) {
        res.json(target)
    } else {
        res.json('n.a.')
    }
})

router.get('/getTickersAndCompanyNames', async (req, res) => {
    console.log('getting list of tickers')
    let list = await LoadTicker.find({}, 'ticker  companyName -_id')    
    if (list) {
        res.json(list)
    } else {
        res.json('n.a.')
    }
})

module.exports = router