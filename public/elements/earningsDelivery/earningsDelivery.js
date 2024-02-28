console.log('earningsDelivery script')

let quarterEndMinus1 = document.querySelector('.quarterEndMinus1')
let periodMinus1 = document.querySelector('.periodMinus1')
let forecastMinus1 = document.querySelector('.forecastMinus1')
let actualMinus1 = document.querySelector('.actualMinus1')
let diffMinus1 = document.querySelector('.diffMinus1')

let quarterEndMinus2 = document.querySelector('.quarterEndMinus2')
let periodMinus2 = document.querySelector('.periodMinus2')
let forecastMinus2 = document.querySelector('.forecastMinus2')
let actualMinus2 = document.querySelector('.actualMinus2')
let diffMinus2 = document.querySelector('.diffMinus2')

let quarterEndMinus3 = document.querySelector('.quarterEndMinus3')
let periodMinus3 = document.querySelector('.periodMinus3')
let forecastMinus3 = document.querySelector('.forecastMinus3')
let actualMinus3 = document.querySelector('.actualMinus3')
let diffMinus3 = document.querySelector('.diffMinus3')

let quarterEndMinus4 = document.querySelector('.quarterEndMinus4')
let periodMinus4 = document.querySelector('.periodMinus4')
let forecastMinus4 = document.querySelector('.forecastMinus4')
let actualMinus4 = document.querySelector('.actualMinus4')
let diffMinus4 = document.querySelector('.diffMinus4')

function buildEpsForecastTable(obj) {
 

    quarterEndMinus1.textContent = obj.data.earningsHistory.earnHistQuarterEndMinus1Q
    periodMinus1.textContent = obj.data.earningsHistory.earnHistPeriodMinus1Q
    forecastMinus1.textContent = (obj.data.earningsHistory.earnHistEpsEstimateMinus1Q).toFixed(2)
    actualMinus1.textContent = (obj.data.earningsHistory.earnHistEpsActualMinus1Q).toFixed(2)
    diffMinus1.textContent = (obj.data.earningsHistory.earnHistDiffMinus1Q * 100).toFixed(2) + "%"

    quarterEndMinus2.textContent = obj.data.earningsHistory.earnHistQuarterEndMinus2Q
    periodMinus2.textContent = obj.data.earningsHistory.earnHistPeriodMinus2Q
    forecastMinus2.textContent = (obj.data.earningsHistory.earnHistEpsEstimateMinus2Q).toFixed(2)
    actualMinus2.textContent = (obj.data.earningsHistory.earnHistEpsActualMinus2Q).toFixed(2)
    diffMinus2.textContent = (obj.data.earningsHistory.earnHistDiffMinus2Q * 100).toFixed(2) + "%"

    quarterEndMinus3.textContent = obj.data.earningsHistory.earnHistQuarterEndMinus3Q
    periodMinus3.textContent = obj.data.earningsHistory.earnHistPeriodMinus3Q
    forecastMinus3.textContent = (obj.data.earningsHistory.earnHistEpsEstimateMinus3Q).toFixed(2)
    actualMinus3.textContent = (obj.data.earningsHistory.earnHistEpsActualMinus3Q).toFixed(2)
    diffMinus3.textContent = (obj.data.earningsHistory.earnHistDiffMinus3Q * 100).toFixed(2) + "%"

    quarterEndMinus4.textContent = obj.data.earningsHistory.earnHistQuarterEndMinus4Q
    periodMinus4.textContent = obj.data.earningsHistory.earnHistPeriodMinus4Q
    forecastMinus4.textContent = (obj.data.earningsHistory.earnHistEpsEstimateMinus4Q).toFixed(2)
    actualMinus4.textContent = (obj.data.earningsHistory.earnHistEpsActualMinus4Q).toFixed(2)
    diffMinus4.textContent = (obj.data.earningsHistory.earnHistDiffMinus4Q * 100).toFixed(2) + "%"
}

function clearEpsForecastTable() {
    quarterEndMinus1.textContent = ""
    periodMinus1.textContent = ""
    forecastMinus1.textContent = ""
    actualMinus1.textContent = ""
    diffMinus1.textContent = ""

    quarterEndMinus2.textContent = ""
    periodMinus2.textContent = ""
    forecastMinus2.textContent = ""
    actualMinus2.textContent = ""
    diffMinus2.textContent = ""

    quarterEndMinus3.textContent = ""
    periodMinus3.textContent = ""
    forecastMinus3.textContent = ""
    actualMinus3.textContent = ""
    diffMinus3.textContent = ""

    quarterEndMinus4.textContent = ""
    periodMinus4.textContent = ""
    forecastMinus4.textContent = ""
    actualMinus4.textContent = ""
    diffMinus4.textContent = ""
}


