'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const mongoose = require("mongoose");
const TickerModel = require('../Models/TickerModel')



router.get('/getEarningsDates', async (req, res) => {
    console.log('ok')
    console.log(req.query)
    let resp = await TickerModel.find({})

    let companies = []

    resp.forEach(element => {
        if (element.data.priceModule && element.data.priceModule.marketCap && element.data.priceModule.marketCap >= 30000) {
            console.log('found')
            try {
                companies.push({
                    ticker: element.ticker,
                    companyName: element.data.priceModule.longName,
                    sector: element.data.assetProfile.sector,
                    mc: element.data.priceModule.marketCap,
                    earningsDate:element.data.calendarEvents.earningsDate
                })
            } catch (error) {
                
            }
        }
    })


    res.json(companies)
})


module.exports = router