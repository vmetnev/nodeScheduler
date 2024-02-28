
console.log('performance script')

performanceTargetTicker = document.querySelector('.performance-targetTicker')
performanceTargetTicker1D = document.querySelector('.performance-targetTicker1D')
performanceSpx1D = document.querySelector('.performance-spx1D')
performanceCcmp1D = document.querySelector('.performance-ccmp1D')
performanceTargetTicker1W = document.querySelector('.performance-targetTicker1W')
performanceSpx1W = document.querySelector('.performance-spx1W')
performanceCcmp1W = document.querySelector('.performance-ccmp1W')
performanceTargetTicker1M = document.querySelector('.performance-targetTicker1M')
performanceSpx1M = document.querySelector('.performance-spx1M')
performanceCcmp1M = document.querySelector('.performance-ccmp1M')
performanceTargetTicker3M = document.querySelector('.performance-targetTicker3M')
performanceSpx3M = document.querySelector('.performance-spx3M')
performanceCcmp3M = document.querySelector('.performance-ccmp3M')
performanceTargetTicker6M = document.querySelector('.performance-targetTicker6M')
performanceSpx6M = document.querySelector('.performance-spx6M')
performanceCcmp6M = document.querySelector('.performance-ccmp6M')
performanceTargetTicker12M = document.querySelector('.performance-targetTicker12M')
performanceSpx12M = document.querySelector('.performance-spx12M')
performanceCcmp12M = document.querySelector('.performance-ccmp12M')
performanceTargetTickerYTD = document.querySelector('.performance-targetTickerYTD')
performanceSpxYTD = document.querySelector('.performance-spxYTD')
performanceCcmpYTD = document.querySelector('.performance-ccmpYTD')
performanceTargetTicker52WeekLow = document.querySelector('.performance-targetTicker52WeekLow')
performanceSpx52WeekLow = document.querySelector('.performance-spx52WeekLow')
performanceCcmp52WeekLow = document.querySelector('.performance-ccmp52WeekLow')
performanceTargetTicker52WeekHigh = document.querySelector('.performance-targetTicker52WeekHigh')
performanceSpx52WeekHigh = document.querySelector('.performance-spx52WeekHigh')
performanceCcmp52WeekHigh = document.querySelector('.performance-ccmp52WeekHigh')

let arr = [
    performanceTargetTicker,
    performanceTargetTicker1D,
    performanceSpx1D,
    performanceCcmp1D,
    performanceTargetTicker1W,
    performanceSpx1W,
    performanceCcmp1W,
    performanceTargetTicker1M,
    performanceSpx1M,
    performanceCcmp1M,
    performanceTargetTicker3M,
    performanceSpx3M,
    performanceCcmp3M,
    performanceTargetTicker6M,
    performanceSpx6M,
    performanceCcmp6M,
    performanceTargetTicker12M,
    performanceSpx12M,
    performanceCcmp12M,
    performanceTargetTickerYTD,
    performanceSpxYTD,
    performanceCcmpYTD,
    performanceTargetTicker52WeekLow,
    performanceSpx52WeekLow,
    performanceCcmp52WeekLow,
    performanceTargetTicker52WeekHigh,
    performanceSpx52WeekHigh,
    performanceCcmp52WeekHigh,
]

let toColorize = [
    performanceTargetTicker1D,
    performanceSpx1D,
    performanceCcmp1D,
    performanceTargetTicker1W,
    performanceSpx1W,
    performanceCcmp1W,
    performanceTargetTicker1M,
    performanceSpx1M,
    performanceCcmp1M,
    performanceTargetTicker3M,
    performanceSpx3M,
    performanceCcmp3M,
    performanceTargetTicker6M,
    performanceSpx6M,
    performanceCcmp6M,
    performanceTargetTicker12M,
    performanceSpx12M,
    performanceCcmp12M,
    performanceTargetTickerYTD,
    performanceSpxYTD,
    performanceCcmpYTD,
]

function buildPerformanceTable(obj, spx, ccmp) {
    clearPerformanceTable()
    performanceTargetTicker.textContent = obj.ticker

    performanceTargetTicker1D.textContent = obj.data.priceObject.perf1D
    performanceSpx1D.textContent = spx.data.priceObject.perf1D
    performanceCcmp1D.textContent = ccmp.data.priceObject.perf1D

    performanceTargetTicker1W.textContent = obj.data.priceObject.perf1W
    performanceSpx1W.textContent = spx.data.priceObject.perf1W
    performanceCcmp1W.textContent = ccmp.data.priceObject.perf1W

    performanceTargetTicker1M.textContent = obj.data.priceObject.perf1M
    performanceSpx1M.textContent = spx.data.priceObject.perf1M
    performanceCcmp1M.textContent = ccmp.data.priceObject.perf1M

    performanceTargetTicker3M.textContent = obj.data.priceObject.perf3M
    performanceSpx3M.textContent = spx.data.priceObject.perf3M
    performanceCcmp3M.textContent = ccmp.data.priceObject.perf3M

    performanceTargetTicker6M.textContent = obj.data.priceObject.perf6M
    performanceSpx6M.textContent = spx.data.priceObject.perf6M
    performanceCcmp6M.textContent = ccmp.data.priceObject.perf6M

    performanceTargetTicker12M.textContent = obj.data.priceObject.perf12M
    performanceSpx12M.textContent = spx.data.priceObject.perf12M
    performanceCcmp12M.textContent = ccmp.data.priceObject.perf12M

    performanceTargetTickerYTD.textContent = obj.data.priceObject.perfYTD
    performanceSpxYTD.textContent = spx.data.priceObject.perfYTD
    performanceCcmpYTD.textContent = ccmp.data.priceObject.perfYTD

   
    
    performanceTargetTicker52WeekLow.textContent = obj.data.priceObject.low52Price.toFixed(2)
    performanceSpx52WeekLow.textContent = goodNumber(spx.data.priceObject.low52Price.toFixed(2))
    performanceCcmp52WeekLow.textContent = goodNumber(ccmp.data.priceObject.low52Price.toFixed(2))


    performanceTargetTicker52WeekHigh.textContent = obj.data.priceObject.high52Price
    performanceSpx52WeekHigh.textContent = goodNumber(spx.data.priceObject.high52Price.toFixed(2))
    performanceCcmp52WeekHigh.textContent = goodNumber(ccmp.data.priceObject.high52Price.toFixed(2))

    toColorize.forEach(item => {
        colorizeCells(item)
    })
}

function colorizeCells(cell) {
    let num = parseFloat(cell.textContent.slice(0, cell.textContent.length - 1))

    num >= 0 ? cell.classList.add('green') : cell.classList.add('red')
}

function clearPerformanceTable() {
    arr.forEach(element => {
        element.textContent = ""
        if (element.classList.contains('red')) element.classList.remove('red')
        if (element.classList.contains('green')) element.classList.remove('green')
    })
}


