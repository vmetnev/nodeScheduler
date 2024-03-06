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

app.use('/news', require('./Routes/newsRoutes'))

app.use('/outloader', require('./Routes/excelRoutes'))
app.use('/outloader', require('./Routes/htmlRoutes'))
app.use('/outloader', require('./Routes/searchRoutes'))

app.use('/earnings', require('./Routes/earningsDatesRoutes'))

app.listen(3003, function () {
    console.log('server started at post 3003')
})


