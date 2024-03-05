const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const statusSchema = require('../Schemas/StatusSchema')
const statusModel = mongoose.model('status', statusSchema)

router.get('/getTable', async (req, res) => {
    let resp = await statusModel.findOne({})
    res.json(resp)
})


module.exports = router