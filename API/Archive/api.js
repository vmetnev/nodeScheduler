'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ReportModel = require('../Models/ReportModel')
const dict = require('../Controllers/serviceDict')

let statusModel = require('../Models/StatusModel')

const TickerSchema = require('../Models/TickerSchema')
getLastTickerDataCollectionName()

let collectionName = ""
let TickerModel = {}

async function getLastTickerDataCollectionName() {
    let statusObject = await statusModel.findOne({})
    console.log(statusObject.collectionName)
    TickerModel = mongoose.model(statusObject.collectionName, TickerSchema)
}

 
 

router.get('/api/performanceAll', async (req, res) => {
    console.log(req.query)
    let { ticker } = req.query
    let target = await TickerModel.find({}, 'ticker  data.priceObject.perf1D -__v')
    console.log(target)
    if (target) {
        target = target.toObject()
        res.json(target)
    } else {
        res.json('n.a.')
    }
})


module.exports = router