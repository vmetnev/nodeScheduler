// here we are getting first element

getHTMLElements()

async function getHTMLElements() {
    // keyInfo
    let keyInfoTable = await fetch('./elements/keyinfo/keyinfo.html')
    let keyInfoTableHTMLElement = await keyInfoTable.text()
    let el = document.createRange().createContextualFragment(keyInfoTableHTMLElement);
    document.querySelector('.page').appendChild(el);
    let keyInfoScript = document.createElement('script')
    keyInfoScript.src = './elements/keyinfo/keyinfo.js'
    document.body.append(keyInfoScript);

    // info
    let infoTable = await fetch('./elements/info/info.html')
    let infoTableHTMLElement = await infoTable.text()
    el = document.createRange().createContextualFragment(infoTableHTMLElement);
    document.querySelector('.page').appendChild(el);
    let infoScript = document.createElement('script')
    infoScript.src = './elements/info/info.js'
    document.body.append(infoScript);

    // performance
    let performanceTable = await fetch('./elements/performance/performance.html')
    let performanceTableHTMLElement = await performanceTable.text()
    el = document.createRange().createContextualFragment(performanceTableHTMLElement);
    document.querySelector('.page').appendChild(el);
    let performanceScript = document.createElement('script')
    performanceScript.src = './elements/performance/performance.js'
    document.body.append(performanceScript);

    // description
    let descriptionTable = await fetch('./elements/description/description.html')
    let descriptionTableHTMLElement = await descriptionTable.text()
    el = document.createRange().createContextualFragment(descriptionTableHTMLElement);
    document.querySelector('.page').appendChild(el);
    let descriptionScript = document.createElement('script')
    descriptionScript.src = './elements/description/description.js'
    document.body.append(descriptionScript);

    // recommendation
    let recommendationTable = await fetch('./elements/recommendations/recommendations.html')
    let recommendationTableHTMLElement = await recommendationTable.text()
    el = document.createRange().createContextualFragment(recommendationTableHTMLElement);
    document.querySelector('.page').appendChild(el);
    let recommendationScript = document.createElement('script')
    recommendationScript.src = './elements/recommendations/recommendations.js'
    document.body.append(recommendationScript);

    // recHistory
    let recHistoryTable = await fetch('./elements/recHistory/recHistory.html')
    let recHistoryTableHTMLElement = await recHistoryTable.text()
    el = document.createRange().createContextualFragment(recHistoryTableHTMLElement);
    document.querySelector('.page').appendChild(el);
    let recHistoryScript = document.createElement('script')
    recHistoryScript.src = './elements/recHistory/recHistory.js'
    document.body.append(recHistoryScript);

    // valuation
    let valuationTable = await fetch('./elements/valuations/valuations.html')
    let valuationTableHTMLElement = await valuationTable.text()
    el = document.createRange().createContextualFragment(valuationTableHTMLElement);
    document.querySelector('.page').appendChild(el);
    let valuationScript = document.createElement('script')
    valuationScript.src = './elements/valuations/valuations.js'
    document.body.append(valuationScript);


    // financialData
    let financialDataTable = await fetch('./elements/financialData/financialData.html')
    let financialDataTableHTMLElement = await financialDataTable.text()
    el = document.createRange().createContextualFragment(financialDataTableHTMLElement);
    document.querySelector('.page').appendChild(el);
    let financialDataScript = document.createElement('script')
    financialDataScript.src = './elements/financialData/financialData.js'
    document.body.append(financialDataScript);

    // growth
    let growthTable = await fetch('./elements/growth/growth.html')
    let growthTableHTMLElement = await growthTable.text()
    el = document.createRange().createContextualFragment(growthTableHTMLElement);
    document.querySelector('.page').appendChild(el);
    let growthScript = document.createElement('script')
    growthScript.src = './elements/growth/growth.js'
    document.body.append(growthScript);

    // revenueForecast
    let revenueForecastTable = await fetch('./elements/revenueForecast/revenueForecast.html')
    let revenueForecastTableHTMLElement = await revenueForecastTable.text()
    el = document.createRange().createContextualFragment(revenueForecastTableHTMLElement);
    document.querySelector('.page').appendChild(el);
    let revenueForecastScript = document.createElement('script')
    revenueForecastScript.src = './elements/revenueForecast/revenueForecast.js'
    document.body.append(revenueForecastScript);


    // epsForecast
    let epsForecastTable = await fetch('./elements/epsForecast/epsForecast.html')
    let epsForecastTableHTMLElement = await epsForecastTable.text()
    el = document.createRange().createContextualFragment(epsForecastTableHTMLElement);
    document.querySelector('.page').appendChild(el);
    let epsForecastScript = document.createElement('script')
    epsForecastScript.src = './elements/epsForecast/epsForecast.js'
    document.body.append(epsForecastScript);

    // margins
    let marginsTable = await fetch('./elements/margins/margins.html')
    let marginsTableHTMLElement = await marginsTable.text()
    el = document.createRange().createContextualFragment(marginsTableHTMLElement);
    document.querySelector('.page').appendChild(el);
    let marginsScript = document.createElement('script')
    marginsScript.src = './elements/margins/margins.js'
    document.body.append(marginsScript);

    // EPS Y1 History
    let epsY1HistoryTable = await fetch('./elements/epsY1History/epsY1History.html')
    let epsY1HistoryTableHTMLElement = await epsY1HistoryTable.text()
    el = document.createRange().createContextualFragment(epsY1HistoryTableHTMLElement);
    document.querySelector('.page').appendChild(el);
    let epsY1HistoryScript = document.createElement('script')
    epsY1HistoryScript.src = './elements/epsY1History/epsY1History.js'
    document.body.append(epsY1HistoryScript);

    // EPS Q1 History
    let epsQ1HistoryTable = await fetch('./elements/epsQ1History/epsQ1History.html')
    let epsQ1HistoryTableHTMLElement = await epsQ1HistoryTable.text()
    el = document.createRange().createContextualFragment(epsQ1HistoryTableHTMLElement);
    document.querySelector('.page').appendChild(el);
    let epsQ1HistoryScript = document.createElement('script')
    epsQ1HistoryScript.src = './elements/epsQ1History/epsQ1History.js'
    document.body.append(epsQ1HistoryScript);


    // Forecast History
    let forecastHistoryTable = await fetch('./elements/forecastHistory/forecastHistory.html')
    let forecastHistoryTableHTMLElement = await forecastHistoryTable.text()
    el = document.createRange().createContextualFragment(forecastHistoryTableHTMLElement);
    document.querySelector('.page').appendChild(el);
    let forecastHistoryScript = document.createElement('script')
    forecastHistoryScript.src = './elements/forecastHistory/forecastHistory.js'
    document.body.append(forecastHistoryScript);

    // Earnings devivery
    let earningsDeliveryTable = await fetch('./elements/earningsDelivery/earningsDelivery.html')
    let earningsDeliveryTableHTMLElement = await earningsDeliveryTable.text()
    el = document.createRange().createContextualFragment(earningsDeliveryTableHTMLElement);
    document.querySelector('.page').appendChild(el);
    let earningsDeliveryScript = document.createElement('script')
    earningsDeliveryScript.src = './elements/earningsDelivery/earningsDelivery.js'
    document.body.append(earningsDeliveryScript);
}

document.querySelector('.ticker-search-button').addEventListener('click', handleTickerSearchButtpnClick)

if (localStorage.ticker) {
    document.querySelector('.ticker-search-input').value = localStorage.ticker
    document.querySelector('.ticker-search-button').click()
}


async function handleTickerSearchButtpnClick() {
    let targetTicker = document.querySelector('.ticker-search-input').value
    console.log(targetTicker)
    getData(targetTicker)
}

getTickers()
async function getTickers() {
    let list = await fetch(`/oneticker/getTickersAndCompanyNames`)
    list = await list.json()

    let suggestions = []
    list.forEach(item => {
        suggestions.push(item.ticker)
        suggestions.push(item.companyName)
    })


}


async function getData(ticker) {
    localStorage.ticker = ticker
    let query = await fetch(`/oneticker/getOneTicker?ticker=${ticker}`)
    let company = await query.json()
    document.querySelector('.data-date').textContent = company.data.date.slice(4, 25)
    document.querySelector('.last-price-date').textContent = company.data.fiveYearPriceData.data[company.data.fiveYearPriceData.data.length - 1][0]
    console.log(company)

    query = await fetch(`/oneticker/getIndexData?ticker=^GSPC`)
    spx = await query.json()

    query = await fetch(`/oneticker/getIndexData?ticker=^IXIC`)
    ccmp = await query.json()

    buildKeyInfoTable(company)
    buildInfoTable(company)

    buildPerformanceTable(company, spx, ccmp)
    buildDescriptionTable(company)
    buildrecommendationsTable(company)
    buildRecHistoryTable(company)
    buildValuationTable(company)
    buildFinancialDataTable(company)
    buildGrowthTable(company)
    buildRevenueForecastTable(company)

    buildMarginTable(company)
    buildEPSY1HistoryTable(company)
    buildEPSQ1HistoryTable(company)
    buildForecastHistoryTable(company)
    console.log('--------------------')
    buildEpsForecastTable1(company)
    buildEpsForecastTable(company)

    console.log('--------------------')


    let chartDataQuery = await fetch('http://127.0.0.1:3003/getChartData?ticker=^GSPC')
    let chartDataObject = await chartDataQuery.json()
    generateChartData(chartDataObject)

    console.log('-----=========-------------')
    console.log(ticker)
    console.log('-----=========-------------')

    let serverDataForChart = await fetch(`http://127.0.0.1:3003/getChartData?ticker=${ticker}`,)
    let chartData = await serverDataForChart.json()
    generateChartData(chartData)


}

document.body.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) handleTickerSearchButtpnClick()

})

document.body.addEventListener('click', handleChartButtonClick)


function handleChartButtonClick(evt) {
    if (evt.target.classList.contains('chartButton')) {
        switch (evt.target.value) { // Select data series depending on period
            case "5Y":
                drawChart('5Y')
                break;

            case "1Y":
                drawChart('1Y')
                break;

            case "YTD":
                drawChart('YTD')
                break;

            case "6M":
                drawChart('6M')
                break;

            case "3M":
                drawChart('3M')
                break;
        }
        let buttonArr = document.querySelectorAll('.chartButton')
        Array.from(buttonArr).forEach(button => {
            if (button.classList.contains('active-button')) button.classList.remove('active-button')
        })
        evt.target.classList.add('active-button')
    }
}

function goodNumber(num, factor = 'none') {


    let arr = (num + "").split('.')

    num = parseInt(arr[0])



    switch (factor) {
        case 'none':
            num = num
            break;
        case 'mn':
            num = Math.round(num / 1000000)
            break;
        case 'bn':
            num = Math.round(num / 1000000000)
            break;
    }
    num = num.toFixed(0).toString()

    if (num.length < 4) {

        if (arr[1]) {
            return num + "." + arr[1]
        } else {
            return num
        }

        return num + "." + arr[1]
    }



    switch (num.length) {
        case 4:
            num = num.substring(0, 1) + " " + num.substring(1, 4)
            break;
        case 5:
            num = num.substring(0, 2) + " " + num.substring(2, 5)
            break;
        case 6:
            num = num.substring(0, 3) + " " + num.substring(3, 6)
            break;
        case 7:
            num = num.substring(0, 1) + " " + num.substring(1, 4) + " " + num.substring(4, 7)
            break;
        case 8:
            num = num.substring(0, 2) + " " + num.substring(2, 5) + " " + num.substring(5, 8)
            break;
        case 9:
            num = num.substring(0, 3) + " " + num.substring(3, 6) + " " + num.substring(6, 9)
            break;
        case 10:
            num = num.substring(0, 1) + " " + num.substring(1, 4) + " " + num.substring(4, 7) + " " +
                num
                    .substring(7, 10)
            break;
        case 11:
            num = num.substring(0, 2) + " " + num.substring(2, 5) + " " + num.substring(5, 8) + " " +
                num
                    .substring(8, 11)
            break;
        case 12:
            num = num.substring(0, 3) + " " + num.substring(3, 6) + " " + num.substring(6, 9) + " " +
                num
                    .substring(9, 12)
            break;
        case 13:
            num = num.substring(0, 1) + " " + num.substring(1, 4) + " " + num.substring(4, 7) + " " +
                num
                    .substring(7, 10) + " " + num.substring(10, 13)
            break;
        case 14:
            num = num.substring(0, 2) + " " + num.substring(2, 5) + " " + num.substring(5, 8) + " " +
                num
                    .substring(8, 11) + " " + num.substring(11, 14)
            break;
        case 15:
            num = num.substring(0, 3) + " " + num.substring(3, 6) + " " + num.substring(6, 9) + " " +
                num
                    .substring(9, 12) + " " + num.substring(12, 15)
            break;
        default:
            num = num
            break;
    }

    if (arr[1]) {
        return num + "." + arr[1]
    } else {
        return num
    }
}

