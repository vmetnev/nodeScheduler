const { secEdgarApi } = require('sec-edgar-api')
const yahooFinance = require('yahoo-finance2').default;
const fs = require('fs')
const path = require('path')

const NewsStory = require('./Models/NewsStoryModel')
const Tag = require('./Models/NewsTagModel')

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

database.collectionName = 'newsStories'

const errorNews = mongoose.model(
    'errorReports',
    new Schema({
        ticker: String,
        error: String,
        date: {
            type: Date,
            default: Date.now
        }
    })
)

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


updateNewsStories()

async function updateNewsStories() {
    let data = await Tag.find({}, 'tag -_id')

    let delay = 0
    let additionalDelay = 0

    for (let q = 480; q < data.length; q++) {
        let instance = data[q].tag

        additionalDelay = (q % 100 === 0) ? 15000 : 0

        delay = delay + 2000 + additionalDelay

        setTimeout(() => {
            console.log(q)
            getNewsForText(instance)
        }, delay)
    }
}

async function getNewsForText(tag) {
    console.log('tag  ' + tag)
    let send = false
    let results

    try {
        results = await yahooFinance.search(tag, { newsCount: 50 }).catch(error => {
            console.log(error)
            console.log('!!!!!!!!!!!!!!!!!!!!!!')

            let err = new errorNews({
                ticker: tag,
                error: "error in fetching for tag - " + tag + "  " + error
            })

            err.save().then(data => {
            })
        })

    } catch (error) {
        console.log(error)

        let err = new errorNews({
            ticker: tag,
            error: "error in fetching for tag - " + tag + "  " + error
        })

        err.save().then(data => {
        })

        if (send === true) {
            return
        }
        return
    }

    if (results && results.news && results.news.length > 0) {
        results = results.news

        results.forEach(async story => {

            let testExistingStories = await NewsStory.find({ uuid: story.uuid })
            console.log(testExistingStories)

            if (testExistingStories.length >= 1) {
                console.log('already exist')
            } else {
                console.log('adding story')

                let newsStory = new NewsStory({
                    mainQuery: tag,
                    title: story.title,
                    link: story.link,
                    publisher: story.publisher,
                    uuid: story.uuid,
                    relatedTickers: story.relatedTickers,
                    providerPublishTime: story.providerPublishTime,
                    unixDateAndTimeAdded: new Date()
                })

                newsStory.save().then(data => {
                    console.log(data)
                    console.log('saved')
                }).catch(error => {
                    console.log(tag + "  " + error)
                })
            }
        });
    } else {
        let err = new errorNews({
            ticker: tag,
            error: "no results or no news stories - " + tag + "  " 
        })

        err.save().then(data => {
        })

        console.log(tag + "  " + "no results or no news stories")
    }




}

module.exports = updateNewsStories