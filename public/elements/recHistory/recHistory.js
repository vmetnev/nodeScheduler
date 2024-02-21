
console.log('recHistory script')

let buyMinus3M = document.querySelector('.buyMinus3M')
let buyMinus2M = document.querySelector('.buyMinus2M')
let buyMinus1M = document.querySelector('.buyMinus1M')
let buyCurrent = document.querySelector('.buyCurrent')
let holdMinus3M = document.querySelector('.holdMinus3M')
let holdMinus2M = document.querySelector('.holdMinus2M')
let holdMinus1M = document.querySelector('.holdMinus1M')
let holdCurrent = document.querySelector('.holdCurrent')
let sellMinus3M = document.querySelector('.sellMinus3M')
let sellMinus2M = document.querySelector('.sellMinus2M')
let sellMinus1M = document.querySelector('.sellMinus1M')
let sellCurrent = document.querySelector('.sellCurrent')
let numOfEPSEstimates = document.querySelector('.numOfEPSEstimates')


function buildRecHistoryTable(obj) {
    buyMinus3M.textContent = obj.data.recommendationTrend.buyMinus3M + obj.data.recommendationTrend.strongBuyMinus3M
    buyMinus2M.textContent = obj.data.recommendationTrend.buyMinus2M + obj.data.recommendationTrend.strongBuyMinus2M
    buyMinus1M.textContent = obj.data.recommendationTrend.buyMinus1M + obj.data.recommendationTrend.strongBuyMinus1M
    buyCurrent.textContent = obj.data.recommendationTrend.buy0 + obj.data.recommendationTrend.strongBuy0
    holdMinus3M.textContent = obj.data.recommendationTrend.holdMinus3M
    holdMinus2M.textContent = obj.data.recommendationTrend.holdMinus2M
    holdMinus1M.textContent = obj.data.recommendationTrend.holdMinus1M
    holdCurrent.textContent = obj.data.recommendationTrend.hold0
    sellMinus3M.textContent = obj.data.recommendationTrend.sellMinus3M + obj.data.recommendationTrend.strongSellMinus3M
    sellMinus2M.textContent = obj.data.recommendationTrend.sellMinus2M + obj.data.recommendationTrend.strongSellMinus2M
    sellMinus1M.textContent = obj.data.recommendationTrend.sellMinus1M + obj.data.recommendationTrend.strongSellMinus1M
    sellCurrent.textContent = obj.data.recommendationTrend.sell0 + obj.data.recommendationTrend.strongSell0
    numOfEPSEstimates.textContent = obj.data.earningsTrend.numberOfAnalystsEpsEstimateY1
}


function clearrRecHistoryTable() {
    buyMinus3M.textContent = ""
    buyMinus2M.textContent = ""
    buyMinus1M.textContent = ""
    buyCurrent.textContent = ""
    holdMinus3M.textContent = ""
    holdMinus2M.textContent = ""
    holdMinus1M.textContent = ""
    holdCurrent.textContent = ""
    sellMinus3M.textContent = ""
    sellMinus2M.textContent = ""
    sellMinus1M.textContent = ""
    sellCurrent.textContent = ""
    numOfEPSEstimates.textContent = ""
}


