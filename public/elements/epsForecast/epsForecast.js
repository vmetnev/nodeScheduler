
console.log('eps forecast script')

let epsEstimateY1 = document.querySelector('.epsEstimateY1')
let epsEstimateY0 = document.querySelector('.epsEstimateY0')
let expectedEpsGrowth = document.querySelector('.expectedEpsGrowth')

function buildEpsForecastTable(obj) {
    epsEstimateY1.textContent = (obj.data.earningsTrend.earningsEstimateAverageY1).toFixed(2)
    epsEstimateY0.textContent = (obj.data.earningsTrend.earningsEstimateAverageY0).toFixed(2)
    expectedEpsGrowth.textContent = (obj.data.earningsTrend.earningsEstimateGrowthY1 * 100).toFixed(2) + "%"
}

function clearEpsForecastTable() {
    epsEstimateY1.textContent = ""
    epsEstimateY0.textContent = ""
    expectedEpsGrowth.textContent = ""

}


