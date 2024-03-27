'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const mongoose = require("mongoose");
const Schema = mongoose.Schema

const activeTagModel = mongoose.model('activetags', new Schema({
    tag: String
}))

const newsStoryModel = require('../Models/NewsSchemas/NewsStoryModel')

router.get('/addActiveTag', async (req, res) => {
    console.log(req.query)
    let { ticker } = req.query
    let target = await TickerModel.findOne({ 'ticker': ticker }, '-__v')
    console.log(target)
    if (target) {
        target = target.toObject()
        res.json(target)
    } else {
        res.json('n.a.')
    }
})

router.get('/deleteTag', async (req, res) => {
    console.log(req.query)
    let { ticker } = req.query
    let target = await TickerModel.findOne({ 'ticker': ticker }, '-__v')
    console.log(target)
    if (target) {
        target = target.toObject()
        res.json(target)
    } else {
        res.json('n.a.')
    }
})

router.get('/getActiveTags', async (req, res) => {
    console.log('getting Tags')
    let tags = await activeTagModel.find({}, 'tag -_id')
    if (tags) {
        res.json(tags)
    } else {
        res.json('n.a.')
    }
})

router.get('/getNews', async (req, res) => {
    console.log('getting news')
    console.log(req.query)
    let { text } = req.query
    let target = await newsStoryModel.find({ mainQuery: text }, '-__v')
    console.log(target)
    if (target) {
        target = target
        res.json(target)
    } else {
        res.json('n.a.')
    }
})

router.get('/markNews', async (req, res) => {
    console.log(req.query)
    let { ticker } = req.query
    let target = await TickerModel.findOne({ 'ticker': ticker }, '-__v')
    console.log(target)
    if (target) {
        target = target.toObject()
        res.json(target)
    } else {
        res.json('n.a.')
    }
})

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

module.exports = router