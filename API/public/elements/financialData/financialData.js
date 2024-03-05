
console.log('financialData script')

let revenue = document.querySelector('.revenue')
let ebitda = document.querySelector('.ebitda')
let netIncome = document.querySelector('.netIncome')
let netDebt = document.querySelector('.netDebt')
let fcf = document.querySelector('.fcf')
let fcfYield = document.querySelector('.fcfYield')

function buildFinancialDataTable(obj) {
    revenue.textContent = goodNumber(Math.round(obj.data.financialData.totalRevenue / 1000000))
    ebitda.textContent = goodNumber(Math.round(obj.data.financialData.ebitda / 1000000))
    netIncome.textContent = goodNumber(Math.round(obj.data.defaultKeyStatistics.netIncomeToCommon / 1000000))

    netDebt.textContent = goodNumber(Math.round((obj.data.defaultKeyStatistics.enterpriseValue - obj.data.priceModule.marketCap) / 1000000))

    fcf.textContent = goodNumber(Math.round(obj.data.financialData.freeCashflow / 1000000))
    fcfYield.textContent = ((obj.data.financialData.freeCashflow / obj.data.defaultKeyStatistics.enterpriseValue) * 100).toFixed(2) + "%"
}

function clearFinancialDataTable() {
    revenue.textContent = ""
    ebitda.textContent = ""
    netIncome.textContent = ""
    netDebt.textContent = ""
    fcf.textContent = ""
    fcfYield.textContent = ""
}


