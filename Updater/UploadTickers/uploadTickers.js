const fs = require('fs')

const LoadTicker = require('../Models/LoadTickerModel')

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

database.collectionName = 'listOfTickers'


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



const rowData = fs.readFileSync('Тикер.txt', "utf-8")
const rows = rowData.split('\n')

let output = []

for (let q = 1; q < rows.length - 1; q++) {
    let instance = {}
    let row = rows[q].split(String.fromCharCode(9))

    instance.spx = (row[0].trim() === "1") ? true : false
    instance.ccmp = (row[1].trim() === "1") ? true : false
    instance.mid = (row[2].trim() === "1") ? true : false
    instance.sml = (row[3].trim() === "1") ? true : false

    instance.ticker = row[4].trim()
    instance.companyName = row[5].trim()
    instance.sector = row[6].trim()
    instance.industry = row[7].trim()

    try {
        instance.mc = row[8].replace(/\s/g, "") * 1
    } catch (error) {
        instance.mc = 0
    }

    instance.description = row[9].slice(1, row[9].length - 1)

    instance.lessThen1 = (instance.mc < 1000) ? true : false
    instance.from1to10 = (instance.mc >= 1000 && instance.mc < 10000) ? true : false
    instance.from10to40 = (instance.mc >= 10000 && instance.mc < 40000) ? true : false
    instance.from40to100 = (instance.mc >= 40000 && instance.mc < 100000) ? true : false
    instance.from100to500 = (instance.mc >= 100000 && instance.mc < 500000) ? true : false
    instance.from500 = (instance.mc > 500000) ? true : false

    output.push(instance)

    let ticker = new LoadTicker({
        spx: instance.spx,
        ccmp: instance.ccmp,
        mid: instance.mid,
        sml: instance.sml,

        ticker: instance.ticker,
        companyName: instance.companyName,
        sector: instance.sector,
        industry: instance.industry,
        mc: instance.mc,
        description: instance.description,
 
        lessThen1 :instance.lessThen1,
        from1to10:instance.from1to10,
        from10to40 :instance.from10to40,
        from40to100 :instance.from40to100,
        from100to500 :instance.from100to500,
        from500 :instance.from500,


    })

    ticker.save()


}

console.log(output[output.length - 1])


