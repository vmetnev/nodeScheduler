
'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const mongoose = require("mongoose");
const TickerModel = require('../Models/TickerModel')
const ReportModel = require('../Models/ReportModel')
const dict = require('../Controllers/serviceDict')



router.get('/search', async (req, res) => {
    console.log('popopop')
 

    let dataToGet = 'ticker data.priceModule.longName data.assetProfile.sector data.assetProfile.industry data.assetProfile.longBusinessSummary data.priceModule.marketCap -_id'

    let data = await TickerModel.find({}, dataToGet)
    if (data) {

        let response = []

        data.forEach(item => {
            response.push({
                ticker: item.ticker,
                companyName: item.data.priceModule.longName,
                mc: item.data.priceModule.marketCap,
                sector: item.data.assetProfile.sector,
                industry: item.data.assetProfile.industry,
                description: item.data.assetProfile.longBusinessSummary,
            })
        })        
        res.json(response)
    } else {
        res.json('n.a.')
    }
})



module.exports = router




