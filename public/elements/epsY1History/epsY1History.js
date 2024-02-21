
console.log('EPS y1 History script')

let epsY1Forecast = document.querySelector('.epsY1Forecast')
let epsY1Forecast7D = document.querySelector('.epsY1Forecast7D')
let epsY1Forecast30D = document.querySelector('.epsY1Forecast30D')
let epsY1Forecast90D = document.querySelector('.epsY1Forecast90D')

function buildEPSY1HistoryTable(obj) {
    epsY1Forecast.textContent = (obj.data.earningsTrend.earningsEstimateAverageY1).toFixed(2)
    epsY1Forecast7D.textContent = (((obj.data.earningsTrend.earningsEstimateAverageY1) / (obj.data.earningsTrend.epsTrend7DaysAgoY1) - 1) * 100).toFixed(2) + "%"
    epsY1Forecast30D.textContent = (((obj.data.earningsTrend.earningsEstimateAverageY1) / (obj.data.earningsTrend.epsTrend30DaysAgoY1) - 1) * 100).toFixed(2) + "%"
    epsY1Forecast90D.textContent = (((obj.data.earningsTrend.earningsEstimateAverageY1) / (obj.data.earningsTrend.epsTrend90DaysAgoY1) - 1) * 100).toFixed(2) + "%"
}

function clearEPSY1HistoryForecastTable() {
    epsY1Forecast.textContent = ""
    epsY1Forecast7D.textContent = ""
    epsY1Forecast30D.textContent = ""
    epsY1Forecast90D.textContent = ""
}


