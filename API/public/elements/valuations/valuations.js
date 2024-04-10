
console.log('valuations script')

let evToSales = document.querySelector('.evToSales')
let evToEBITDA = document.querySelector('.evToEBITDA')
let trailingPE = document.querySelector('.trailingPE')
let forwardPE = document.querySelector('.forwardPE')
let dividendYield = document.querySelector('.dividendYield')

function buildValuationTable(obj) {
    evToSales.textContent = obj.data.defaultKeyStatistics.enterpriseToRevenue.toFixed(2)
    evToEBITDA.textContent = obj.data.defaultKeyStatistics.enterpriseToEbitda.toFixed(2)
    console.log(obj.data.summaryDetail.trailingPE)
    trailingPE.textContent = (obj.data.summaryDetail.trailingPE) ? obj.data.summaryDetail.trailingPE.toFixed(2) :"n.a."
    forwardPE.textContent = obj.data.defaultKeyStatistics.forwardPE.toFixed(2)
    dividendYield.textContent = (obj.data.summaryDetail.dividendYield * 100).toFixed(2) + "%"
}

function clearValuationTable() {
    evToSales.textContent = ""
    evToEBITDA.textContent = ""
    trailingPE.textContent = ""
    forwardPE.textContent = ""
    dividendYield.textContent = ""
}


