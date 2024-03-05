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



const LoadTickerSchema =
    new Schema({
        spx: Boolean,
        ccmp: Boolean,
        mid: Boolean,
        sml: Boolean,

        ticker: String,
        tickerType: String,
        companyName: String,
        sector: String,
        industry: String,
        mc: Number,
        description: String,

        lessThen1: Boolean,
        from1to10: Boolean,
        from10to40: Boolean,
        from40to100: Boolean,
        from100to500: Boolean,
        from500: Boolean,
    }, { strict: false })


module.exports = LoadTickerSchema