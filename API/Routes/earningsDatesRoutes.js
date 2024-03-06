'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const status = require('../Models/StatusModel')



router.get('/getEarningsDates', async (req, res) => {
    console.log('99999')
    let statusObject = await status.findOne({})
    console.log(statusObject.collectionName)
    const TickerModel = mongoose.model(statusObject.collectionName, require('../Models/TickerSchema'))

    console.log(TickerModel)
    let resp = await TickerModel.find({})
    console.log(resp.length)
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