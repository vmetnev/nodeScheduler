
console.log('info script')

let country = document.querySelector('.info-country')
let employees = document.querySelector('.info-employees')
let tradingCurrency = document.querySelector('.info-tradingCurrency')
let financialCurrency = document.querySelector('.info-financialCurrency')
let website = document.querySelector('.info-website')
let nextEarningsDate = document.querySelector('.info-nextEarningsDate')


function buildInfoTable(obj) {    
    country.textContent = obj.data.assetProfile.country
    employees.textContent =  goodNumber(obj.data.assetProfile.fullTimeEmployees )
    tradingCurrency.textContent =  obj.data.priceModule.tradingCurrency
    financialCurrency.textContent =  obj.data.financialData.financialCurrency
    website.href = obj.data.assetProfile.website
    website.textContent = obj.data.assetProfile.website
    nextEarningsDate.textContent = obj.data.calendarEvents.earningsDate    
}

function clearInfoTable() {
    ticker.textContent = ""
    companyName.textContent = ""
    lastPrice.textContent = ""
    marketCap.textContent = ""
    enterpriseValue.textContent = ""
    sector.textContent = ""
    industry.textContent = ""
    beta.textContent = ""
}


