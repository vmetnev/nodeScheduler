'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const mongoose = require("mongoose");
const TickerModel = require('../Models/TickerModel')
const ReportModel = require('../Models/ReportModel')
const dict = require('../Controllers/serviceDict')



router.get('/html/all', async (req, res) => {

    console.log(req.query)
    let { ticker } = req.query

    let target = await TickerModel.findOne({ 'ticker': ticker }, '-__v')
    let report = await ReportModel.findOne({ 'ticker': ticker }, '-_id -__v')


    if (target && report) {
        target = target.toObject()
        report = report.toObject()
        target.report = {}
        target.report = report

        res.json(target)
    } else {
        res.json('n.a.')
    }
})


router.get('/html/getTickerData', async (req, res) => {
    console.log(req.query)
    let { ticker } = req.query
    let target = await TickerModel.findOne({ 'ticker': ticker }, '-__v')
    if (target) {
        target = target.toObject()
        res.json(target)
    } else {
        res.json('n.a.')
    }
})



router.post('/html/service', async (req, res) => {
    console.log('here-----------------------------')
    console.log(req.query)
    let { ticker, service } = req.query



    let target = await TickerModel.findOne({ 'ticker': ticker }, '-__v')
    let report = await ReportModel.findOne({ 'ticker': ticker }, '-_id -__v')



    if (target /*&& report*/) {
        target = target.toObject()

        if (report) {
            report = report.toObject()
            target.report = {}
            target.report = report
        } else {
            target.report = "no report"
        }

        let response = dict(target, service)
        console.log(response)


        res.json(response)
    } else {
        res.json('n.a.')
    }

})

router.post('/html/singlepoint', require("../singlePointers/priceModule"))





module.exports = router