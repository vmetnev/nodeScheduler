'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const mongoose = require("mongoose");
const statusModel = require('../Models/StatusModel')



router.get('/getTable', async (req, res) => {
    console.log('ok')
    console.log(req.query)
    let resp = await statusModel.findOne({})

    res.json(resp)
})


module.exports = router