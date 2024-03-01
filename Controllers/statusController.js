
const mongoose = require("mongoose");
const {
    Schema
} = mongoose;

const database = {
    uri: "mongodb://127.0.0.1:27017/",
    name: "scheduler",
    user: "",
    password: "",
    options: {},
};

database.collectionName = 'status'

function mongooseConnect() {
    mongoose.connect(`${database.uri}${database.name}`, database.options).then(
        () => {
            console.log("Mongo connected...")
        },
        err => {
            console.error(err)
        }
    )
}

mongooseConnect()

const statusModel = require('../Models/StatusModel')

function status() {

}

// sets the object before work
// status.setStatusObject()

status.setStatusObject = async function () {
    let status = await statusModel.findOne({})
    if (!status) {
        let createNewStatusObject = new statusModel({})
        await createNewStatusObject.save()
    }

    status = await statusModel.findOneAndUpdate({}, {
        collectionNamePrevious:status.collectionName,
        collectionName: `tickerdata${new Date().toISOString().slice(0, 10)}`,
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
    return new Promise(async (resolve, reject) => {
        let status = await statusModel.findOne({})
        status.tickerUpdateCurrentStatus = "Finished"
        status.tickerUpdateEndTime = new Date()
        await status.save()
        resolve("ok")
    })
}




// for internal use
setTimeout(async () => {
    status.print()

    await status.addOKTicker("fdfd")
    await status.addOKTicker("eee")
    await status.addOKTicker("fd333fd")
    await status.addOKTicker("fd beberfd")


    await status.addErrorTicker("AAPL")
    await status.addErrorTicker("MDB")



    await status.addError("some error")
    await status.addError("some error2")

    await status.addQueredTicker("ADBE")
    await status.addQueredTicker("XOM")

}, 1000)



module.exports = status