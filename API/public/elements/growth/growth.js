


console.log('growth script')

let revenueGrowthEstY1 = document.querySelector('.revenueGrowthEstY1')
let epsGrowthEstY1 = document.querySelector('.epsGrowthEstY1')
let lastFiscalYear = document.querySelector('.lastFiscalYear')
let nextFiscalYear = document.querySelector('.nextFiscalYear')
let lastQuarter = document.querySelector('.lastQuarter')

function buildGrowthTable(obj) {

    revenueGrowthEstY1.textContent = (obj.data.earningsTrend.revenueEstimateGrowthY1 * 100).toFixed(2) + "%"
    epsGrowthEstY1.textContent = (obj.data.earningsTrend.earningsEstimateGrowthY1 * 100).toFixed(2) + "%"

    lastFiscalYear.textContent = obj.data.defaultKeyStatistics.lastFiscalYearEnd
    nextFiscalYear.textContent = obj.data.defaultKeyStatistics.nextFiscalYearEnd

    lastQuarter.textContent = obj.data.earningsHistory.earnHistQuarterEndMinus1Q
}

function clearGrowthTable() {
    revenueGrowthEstY1.textContent = ""
    epsGrowthEstY1.textContent = ""
    lastFiscalYear.textContent = ""
    nextFiscalYear.textContent = ""
    lastQuarter.textContent = ""
}


