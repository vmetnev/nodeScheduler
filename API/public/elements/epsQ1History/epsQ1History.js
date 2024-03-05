
console.log('EPS q1 History script')

let epsQ1Forecast = document.querySelector('.epsQ1Forecast')
let epsQ1Forecast7D = document.querySelector('.epsQ1Forecast7D')
let epsQ1Forecast30D = document.querySelector('.epsQ1Forecast30D')
let epsQ1Forecast90D = document.querySelector('.epsQ1Forecast90D')

function buildEPSQ1HistoryTable(obj) {
    epsQ1Forecast.textContent = (obj.data.earningsTrend.earningsEstimateAverageQ1).toFixed(2)
    epsQ1Forecast7D.textContent = (((obj.data.earningsTrend.earningsEstimateAverageQ1) / (obj.data.earningsTrend.epsTrend7DaysAgoQ1) - 1) * 100).toFixed(2) + "%"
    epsQ1Forecast30D.textContent = (((obj.data.earningsTrend.earningsEstimateAverageQ1) / (obj.data.earningsTrend.epsTrend30DaysAgoQ1) - 1) * 100).toFixed(2) + "%"
    epsQ1Forecast90D.textContent = (((obj.data.earningsTrend.earningsEstimateAverageQ1) / (obj.data.earningsTrend.epsTrend90DaysAgoQ1) - 1) * 100).toFixed(2) + "%"
}

function clearEPSQ1HistoryForecastTable() {
    epsQ1Forecast.textContent = ""
    epsQ1Forecast7D.textContent = ""
    epsQ1Forecast30D.textContent = ""
    epsQ1Forecast90D.textContent = ""
}


