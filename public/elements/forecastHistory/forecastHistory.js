
console.log('forecast History script')

let epsY1ForecastHistory = document.querySelector('.history-epsY1Forecast')
let epsY1Forecast7DHistory = document.querySelector('.history-epsY1Forecast7D')
let epsY1Forecast30DHistory = document.querySelector('.history-epsY1Forecast30D')
let epsY1Forecast90DHistory= document.querySelector('.history-epsY1Forecast90D')

let epsQ1ForecastHistory = document.querySelector('.history-epsQ1Forecast')
let epsQ1Forecast7DHistory = document.querySelector('.history-epsQ1Forecast7D')
let epsQ1Forecast30DHistory = document.querySelector('.history-epsQ1Forecast30D')
let epsQ1Forecast90DHistory = document.querySelector('.history-epsQ1Forecast90D')

function buildForecastHistoryTable(obj) {
    epsY1ForecastHistory.textContent = (obj.data.earningsTrend.earningsEstimateAverageY1).toFixed(2)
    epsY1Forecast7DHistory.textContent = (obj.data.earningsTrend.epsTrend7DaysAgoY1).toFixed(2)
    epsY1Forecast30DHistory.textContent = (obj.data.earningsTrend.epsTrend30DaysAgoY1).toFixed(2)
    epsY1Forecast90DHistory.textContent = (obj.data.earningsTrend.epsTrend90DaysAgoY1).toFixed(2)

    epsQ1ForecastHistory.textContent = (obj.data.earningsTrend.earningsEstimateAverageQ1).toFixed(2)
    epsQ1Forecast7DHistory.textContent = (obj.data.earningsTrend.epsTrend7DaysAgoQ1).toFixed(2)
    epsQ1Forecast30DHistory.textContent = (obj.data.earningsTrend.epsTrend30DaysAgoQ1).toFixed(2)
    epsQ1Forecast90DHistory.textContent = (obj.data.earningsTrend.epsTrend90DaysAgoQ1).toFixed(2)
}

function clearEPSY1HistoryForecastTable() {
    epsY1ForecastHistory.textContent = ""
    epsY1Forecast7DHistory.textContent = ""
    epsY1Forecast30DHistory.textContent = ""
    epsY1Forecast90DHistory.textContent = ""

    epsQ1ForecastHistory.textContent = ""
    epsQ1Forecast7DHistory.textContent = ""
    epsQ1Forecast30DHistory.textContent = ""
    epsQ1Forecast90DHistory.textContent = ""
}




