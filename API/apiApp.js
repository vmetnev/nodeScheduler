const express = require('express')
const app = express()

var bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')

const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

const getPriceRange = require('./Loaders/priceRangeQueryModule')

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("strictQuery", false);

const database = {
    uri: "mongodb://127.0.0.1:27017/",
    name: "scheduler",
    user: "",
    password: "",
    options: {},
};

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


app.use(express.static(path.join(__dirname, 'public')))
app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

app.use('/oneticker', require('./Routes/oneTickerRoutes'))



app.use('/news', require('./Routes/newsRoutes'))

app.use('/outloader', require('./Routes/excelRoutes'))
app.use('/outloader', require('./Routes/htmlRoutes'))
app.use('/outloader', require('./Routes/searchRoutes'))

app.use('/earnings', require('./Routes/earningsDatesRoutes'))
app.use('/performance', require('./Routes/performanceRoutes'))


app.get('/getChartData', async (req, res) => {
    let targetTicker = req.query.ticker
    console.log(targetTicker)

    let indexTicker = (targetTicker === "^GSPC") ? "^IXIC" : "^GSPC"

    console.log(targetTicker)
    console.log(indexTicker)

    let tickerPriceData = await getPriceRange(targetTicker)
    let indexPriceData = await getPriceRange(indexTicker)

    res.send([{ targetTicker: targetTicker, tickerData: tickerPriceData }, { indexTicker: indexTicker, indexData: indexPriceData }])

})

app.listen(3003, function () {
    console.log('server started at post 3003')
})


