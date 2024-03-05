'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TickerModel = mongoose.model('tickerdata2024-02-28', require('../Models/TickerSchema'))


router.get('/getEarningsDates', async (req, res) => {
    console.log('99999')
    console.log(req.query)
    let resp = await TickerModel.find({})

    let companies = []

    resp.forEach(element => {
        if (element.data.priceModule && element.data.priceModule.marketCap && element.data.priceModule.marketCap >= 30000) {            
            try {
                companies.push({
                    ticker: element.ticker,
                    companyName: element.data.priceModule.longName,
                    sector: element.data.assetProfile.sector,
                    mc: element.data.priceModule.marketCap,
                    earningsDate: element.data.calendarEvents.earningsDate
                })
            } catch (error) {

            }
        }
    })


    res.json(companies)
})


module.exports = router