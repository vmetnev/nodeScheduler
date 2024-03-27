async function getPriceRange(targetTicker) {
    return new Promise(async (resolve, reject) => {
        let today = new Date()
        let minus5Years = today.setFullYear(today.getFullYear() - 5) && today;
        today = new Date()
        today = Math.round(today.valueOf() / 1000)
        minus5Years = Math.round(minus5Years.valueOf() / 1000)

        let priceDataArr = await priceRangeQueryModule(targetTicker, minus5Years, today)
        resolve(priceDataArr)
    })
}

async function priceRangeQueryModule(targetTicker, unixShortStart, unixShortEnd) {
    return new Promise(async (resolve, reject) => {
        try {
            let priceDataArr = []
            let url = `https://query1.finance.yahoo.com/v7/finance/download/${targetTicker}?period1=${unixShortStart}&period2=${unixShortEnd}&interval=1d&events=history&includeAdjustedClose=true`
            const response = await fetch(url)
            const resp = await response.text()

            let dayArr = []

            resp.split(String.fromCharCode(10)).forEach((day) => {
                dayArr = [day.split(',')[0], parseFloat(day.split(',')[4]).toFixed(4)]
                priceDataArr.push(dayArr)
            })
            resolve(priceDataArr)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = getPriceRange
