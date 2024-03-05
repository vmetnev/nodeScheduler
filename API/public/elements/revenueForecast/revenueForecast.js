
console.log('revenue forecast script')

let revenueEstimateY1 = document.querySelector('.revenueEstimateY1')
let revenueEstimateY0 = document.querySelector('.revenueEstimateY0')
let expectedRevenueGrowth = document.querySelector('.expectedRevenueGrowth')

function buildRevenueForecastTable(obj) {
    revenueEstimateY1.textContent = goodNumber(Math.round(obj.data.earningsTrend.revenueEstimateAverageY1 / 1000000))
    revenueEstimateY0.textContent = goodNumber(Math.round(obj.data.earningsTrend.revenueEstimateAverageY0 / 1000000))
    expectedRevenueGrowth.textContent = (obj.data.earningsTrend.revenueEstimateGrowthY1 * 100).toFixed(2) + "%"
}

function clearRevenueForecastTable() {
    revenueEstimateY1.textContent = ""
    revenueEstimateY0.textContent = ""
    expectedRevenueGrowth.textContent = ""

}


