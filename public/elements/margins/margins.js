
console.log('Margin forecast script')

let grossMargin = document.querySelector('.grossMargin')
let ebitdaMargin = document.querySelector('.ebitdaMargin')
let ebitMargin = document.querySelector('.ebitMargin')
let netMargin = document.querySelector('.netMargin')

function buildMarginTable(obj) {
    grossMargin.textContent = (obj.data.financialData.grossMargins * 100).toFixed(2) + "%"
    ebitdaMargin.textContent = (obj.data.financialData.ebitdaMargins * 100).toFixed(2) + "%"
    ebitMargin.textContent = (obj.data.financialData.operatingMargins * 100).toFixed(2) + "%"
    netMargin.textContent = (obj.data.financialData.profitMargins * 100).toFixed(2) + "%"
}

function clearMarginForecastTable() {
    grossMargin.textContent = ""
    ebitdaMargin.textContent = ""
    ebitMargin.textContent = ""
    netMargin.textContent = ""
}


