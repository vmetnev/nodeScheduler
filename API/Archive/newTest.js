

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


let input = mongoose.model('listoftickers', require('../Models/LoadTickerShema'))
let output = mongoose.model('shortlistoftickers', require('../Models/LoadTickerShema'))


function mongooseConnect() {
    mongoose.connect(`${database.uri}${database.name}`, database.options).then(
        () => {
            console.log("Mongo connected...")
            getData()
        },
        err => {
            console.error(err)
        }
    )
}

mongooseConnect()


async function getData() {

    let data1 = await input.find({ 'mc': { $gte: 3000 } }, '-_id')
    console.log(data1.length)
    let data2 = await input.find({ 'tickerType': 'other' }, '-_id')

    data1.forEach(async instance => {
        let target = new output({

            spx: instance.spx,
            ccmp: instance.ccmp,
            mid: instance.mid,
            sml: instance.sml,

            ticker: instance.ticker,
            tickerType: instance.ticker,
            companyName: instance.companyName,
            sector: instance.sector,
            industry: instance.industry,
            mc: instance.mc,
            description: instance.description,

            lessThen1: instance.lessThen1,
            from1to10: instance.from1to10,
            from10to40: instance.from10to40,
            from40to100: instance.from40to100,
            from100to500: instance.from100to500,
            from500: instance.from500,
        })
        await target.save().then(data=>console.log(data))
    })

    data2.forEach(async instance => {
        let target = new output({
            ticker: instance.ticker,
            tickerType: "other"
        })
        await target.save().then(data=>console.log(data))
    })



}