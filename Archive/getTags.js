const { secEdgarApi } = require('sec-edgar-api')
const yahooFinance = require('yahoo-finance2').default;
const fs = require('fs')
const path = require('path')
const LoadTicker = require('../Models/LoadTickerModel')

const Tag = require('../Models/NewsTagModel')

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

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

database.collectionName = 'tags'

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

getAllTags()

async function getAllTags() {

    let tags = await LoadTicker.find({}, 'ticker -_id')

    console.log(tags)

    tags.forEach(tag => {
        let newTag = new Tag({
            tag: tag.ticker
        })
        newTag.save()

    })


}