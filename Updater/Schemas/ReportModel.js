

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

database.collectionName = 'reports'

const Report = mongoose.model(
    database.collectionName,
    new Schema({
        ticker: String,

        dateReportY0: String,
        fiscalYearY0: String,
        revenueY0: String,
        ebitY0: String,
        epsY0: String,

        dateReportY1: String,
        fiscalYearY1: String,
        revenueY1: String,
        ebitY1: String,
        epsY1: String,

        dateReportY2: String,
        fiscalYearY2: String,
        revenueY2: String,
        ebitY2: String,
        epsY2: String,

        dateReportY3: String,
        fiscalYearY3: String,
        revenueY3: String,
        ebitY3: String,
        epsY3: String,

        dateReportY4: String,
        fiscalYearY4: String,
        revenueY4: String,
        ebitY4: String,
        epsY4: String,

        dateReportY5: String,
        fiscalYearY5: String,
        revenueY5: String,
        ebitY5: String,
        epsY5: String,

    })
)

module.exports = Report