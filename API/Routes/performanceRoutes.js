'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const mongoose = require("mongoose");
const Schema = mongoose.Schema

const TickerSchema = require('../Models/TickerSchema')
let TickerModel = mongoose.model('priceandcalendaronly2024-03-26', TickerSchema)

router.get('/allData', async (req, res) => {
    console.log('performance all route')
    let data = await TickerModel.find({}).catch(error => res.json({ msg: "error", error: error }))
    res.json({ msg: "ok", data: data })
})

module.exports = router




