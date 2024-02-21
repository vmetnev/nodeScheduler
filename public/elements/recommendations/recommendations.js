
console.log('recommendations script')

let recommendationKey = document.querySelector('.recommendation-key')
let recommendationTargetPrice = document.querySelector('.recommendation-targetPrice')
let recommendationUpside = document.querySelector('.recommendation-upside')
let recommendationHighTargetPrice = document.querySelector('.recommendation-highTargetPrice')

function buildrecommendationsTable(obj) {    
    recommendationKey.textContent = obj.data.financialData.recommendationKey[0].toUpperCase() + obj.data.financialData.recommendationKey.slice(1)
    recommendationTargetPrice.textContent = obj.data.financialData.targetMedianPrice.toFixed(2)
    recommendationUpside.textContent = ((obj.data.financialData.targetMedianPrice / obj.data.priceModule.regularMarketPrice - 1) * 100).toFixed(2) + "%"
    recommendationHighTargetPrice.textContent = obj.data.financialData.targetHighPrice
}

function clearrecommendationsTable() {
    recommendationKey.textContent = ""
    recommendationTargetPrice.textContent = ""
    recommendationUpside.textContent = ""
    recommendationHighTargetPrice.textContent = ""
}


