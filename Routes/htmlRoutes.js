
'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const mongoose = require("mongoose");
const TickerModel = require('../Models/TickerModel')
const ReportModel = require('../Models/ReportModel')
const dict = require('../Controllers/serviceDict')

let memoryEngine = []

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

router.post('/html/service', async (req, res) => {
    console.log(req.query)
    let { ticker, service } = req.query

    let search = memoryEngine.filter(item => item.ticker === ticker)[0]

    if (search) {
        console.log('serving from memory')

        let response = dict(search, service)

        res.json(response)

    } else {

        console.log('serving from database')
        let target = await TickerModel.findOne({ 'ticker': ticker }, '-__v')
        let report = await ReportModel.findOne({ 'ticker': ticker }, '-_id -__v')

        console.log(report)

        if (target /*&& report*/) {
            target = target.toObject()
            
            if(report) {
            report = report.toObject()
            target.report = {}
            target.report = report
            } else {
                target.report ="no report"
            }


            let response = dict(target, service)
            console.log(response)
            memoryEngine.push(target)

            res.json(response)
        } else {
            res.json('n.a.')
        }
    }
})

module.exports = router