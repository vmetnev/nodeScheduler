const mongoose = require("mongoose");
const Schema = mongoose.Schema

const { database } = require('../A_KEY_DATA/keyData')

const collectionNameForStatus = 'status'

const statusSchema = require('../Schemas/StatusSchema')
const statusModel = mongoose.model(collectionNameForStatus, statusSchema)

const status = () => { }

// sets the object before work
// status.setStatusObject()

status.setStatusObject = async function () {
    let status = await statusModel.findOne({})
    if (!status) {
        let createNewStatusObject = new statusModel({})
        await createNewStatusObject.save()
    }

    status = await statusModel.findOneAndUpdate({}, {
        collectionNamePrevious: status.collectionName,
        collectionName: collectionNameForStatus,
        tickerUpdateCurrentStatus: "In process",
        tickerUpdateStartTime: new Date(),
        tickerUpdateEndTime: "not yet",
        noOfTickersQuered: 0,
        listOfTickersQuered: [],
        noOfTickersOK: 0,
        listOfTickersOK: [],
        noOfTickersErrors: 0,
        noOfErrors: 0,
        listOfTickersWithErrors: [],
        arrayOfErrors: [],
        lastQueryTime: ""

    })

    statusObject = await statusModel.findOne({})
}

status.print = async function () {
    console.log(await statusModel.findOne({}))
}

status.addOKTicker = async function (ticker) {
    return new Promise(async (resolve, reject) => {
        let status = await statusModel.findOne({})
        status.listOfTickersOK.push(ticker)
        status.noOfTickersOK = status.noOfTickersOK + 1
        await status.save()
        resolve("ok")
    })
}

status.addQueredTicker = async function (ticker) {
    return new Promise(async (resolve, reject) => {
        let status = await statusModel.findOne({})
        status.lastQueryTime = new Date()
        status.listOfTickersQuered.push(ticker)
        status.noOfTickersQuered = status.noOfTickersQuered + 1
        await status.save()
        resolve("ok")
    })
}

status.addErrorTicker = async function (ticker) {
    return new Promise(async (resolve, reject) => {
        let status = await statusModel.findOne({})

        if (status.listOfTickersWithErrors.indexOf(ticker) === -1) {
            status.listOfTickersWithErrors.push(ticker)
            status.noOfTickersErrors = status.noOfTickersErrors + 1
        }
        await status.save()
        resolve("ok")
    })
}

status.addError = async function (text) {
    return new Promise(async (resolve, reject) => {
        let status = await statusModel.findOne({})
        status.arrayOfErrors.push(text)
        status.noOfErrors = status.noOfErrors + 1
        await status.save()
        resolve("ok")
    })
}

status.finish = async function () {
    console.log('finish fired')
    return new Promise(async (resolve, reject) => {
        let status = await statusModel.findOne({})
        status.tickerUpdateCurrentStatus = "Finished"
        status.tickerUpdateEndTime = new Date()
        await status.save()
        resolve("ok")
    })
}

module.exports = status