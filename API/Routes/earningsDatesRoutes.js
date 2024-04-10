'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let collectionNames = []
let targetCollection = {}
const TickerSchema = require('../Models/TickerSchema')

mongoose.connection.listCollections().then(data => {
    data.forEach(collection => {
        console.log(collection.name)
        if (collection.name.includes('priceandcalendaronly')) {
            let instance = {}
            instance.name = collection.name
            instance.dateString = collection.name.split("only")[1]
            instance.dateValue = new Date(instance.dateString).valueOf()
            collectionNames.push(instance)
        }
    })

    targetCollection = collectionNames[0]
    let maxCollectionValue = collectionNames[0].dateValue

    for (let q = 0; q < collectionNames.length; q++) {
        if (collectionNames[q].dateValue > maxCollectionValue) {
            targetCollection = collectionNames[q]
            maxCollectionValue = collectionNames[q].dateValue
        }
    }
    console.log('targetCollection.name')
    console.log(targetCollection.name)
})

router.get('/getEarningsDates', async (req, res) => {
    console.log(targetCollection.name)
    const TickerModel = mongoose.model(targetCollection.name, TickerSchema)
    let resp = await TickerModel.find({}).select('-data.fiveYearPriceData')

    console.log(resp.length)
    let companies = []

    resp.forEach(element => {

        if (element.data.priceModule && element.data.priceModule.marketCap && element.data.priceModule.marketCap >= 30000) {
            try {
                companies.push({
                    ticker: element.ticker,
                    companyName: element.data.priceModule.longName,
                    sector: element.data.assetProfile.sector,
                    industry: element.data.assetProfile.industry,
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