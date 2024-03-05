const express = require('express')
const app = express()

var bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const cors = require("cors");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("strictQuery", false);

const { database, corsOptions } = require('./A_KEY_DATA/keyData')

const statusRouter = require('./Routes/statusRoutes')

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

app.use(statusRouter)

app.get('/', async (req, res) => {
    console.log('here')
    res.json("popo")
})


 

app.listen(3002, function () {
    console.log('Update server  started at post 3002')
})


