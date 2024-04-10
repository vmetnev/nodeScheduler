'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const mongoose = require("mongoose");
const Schema = mongoose.Schema

const TickerSchema = require('../Models/TickerSchema')

let collectionNames = []
let targetCollection = {}
mongoose.connection.listCollections().then(data => {
    data.forEach(collection => {
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

    // console.log(targetCollection.name)
})





 



router.get('/allData', async (req, res) => {
    let TickerModel = mongoose.model(targetCollection.name, TickerSchema)
    console.log('performance all route')
    let data = await TickerModel.find({}).select('-data.fiveYearPriceData').catch(error => res.json({ msg: "error", error: error }))

    res.json({ msg: "ok", data: data, collectionName: targetCollection.name })
})

module.exports = router




