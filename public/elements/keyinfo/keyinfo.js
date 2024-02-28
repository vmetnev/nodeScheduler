
console.log('key info script')

let ticker = document.querySelector('.keyinfo-ticker')
let companyName = document.querySelector('.keyinfo-companyName')
let lastPrice = document.querySelector('.keyinfo-lastPrice')
let marketCap = document.querySelector('.keyinfo-marketCap')
let enterpriseValue = document.querySelector('.keyinfo-enterpriseValue')
let sector = document.querySelector('.keyinfo-sector')
let industry = document.querySelector('.keyinfo-industry')
let beta = document.querySelector('.keyinfo-beta')

function buildKeyInfoTable(obj) {   
    console.log(obj) 
    ticker.textContent = obj.ticker
    companyName.textContent = obj.data.priceModule.longName
    lastPrice.textContent = obj.data.priceModule.regularMarketPrice
    marketCap.textContent = goodNumber(Math.round(obj.data.priceModule.marketCap / 1000000, 0))
    enterpriseValue.textContent = goodNumber(Math.round(obj.data.defaultKeyStatistics.enterpriseValue / 1000000, 0))
    sector.textContent = obj.data.assetProfile.sector
    industry.textContent = obj.data.assetProfile.industry
    beta.textContent = (obj.data.summaryDetail.summaryBeta)//.toFixed(2)
}

function clearKeyInfoTable() {
    ticker.textContent = ""
    companyName.textContent = ""
    lastPrice.textContent = ""
    marketCap.textContent = ""
    enterpriseValue.textContent = ""
    sector.textContent = ""
    industry.textContent = ""
    beta.textContent = ""
}


