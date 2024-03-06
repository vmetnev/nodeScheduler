'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const mongoose = require("mongoose");
const Schema = mongoose.Schema

let statusModel = require('../Models/StatusModel')

const TickerSchema = require('../Models/TickerSchema')
getLastTickerDataCollectionName()

let TickerModel 

async function getLastTickerDataCollectionName() {
    let statusObject = await statusModel.findOne({})
    console.log('-----------------')
    console.log(statusObject.collectionName)
    console.log('-----------------')
    TickerModel = mongoose.model(statusObject.collectionName, TickerSchema)
}

router.get('/search', async (req, res) => {
    console.log('here')
    let dataToGet = 'ticker data.priceModule.longName data.assetProfile.sector data.assetProfile.industry data.assetProfile.longBusinessSummary data.priceModule.marketCap -_id'
    let data = await TickerModel.find({}, dataToGet)
    if (data) {

        let response = []

        data.forEach(item => {

            if (item.ticker != "^GSPC" && item.ticker != "^IXIC") {
                response.push({
                    ticker: item.ticker,
                    companyName: item.data.priceModule.longName,
                    mc: item.data.priceModule.marketCap,
                    sector: item.data.assetProfile.sector,
                    industry: item.data.assetProfile.industry,
                    description: item.data.assetProfile.longBusinessSummary,
                })
            }


        })
        res.json(response)
    } else { 
        res.json('n.a.')
    }
})

module.exports = router




