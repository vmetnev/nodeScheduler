let axis = {}

let chartData = []
let chartData1Y = []
let chartDataYTD = []
let chartData6M = []
let chartData3M = []

google.charts.load('current', {
    'packages': ['corechart']
});

let noIndexChartDataNeedTickers = ['^VIX', 'ES=F', 'YM=F', 'NQ=F', '^FVX', '^TNX', '^TYX', 'EURUSD=X', 'GC=F', 'BZ=F', 'MCL=F']

function drawChart(period = '5Y') {
    let targetData = []
    let targetAxis = {}

    switch (period) { // Select data series depending on period
        case "5Y":
            targetData = chartData
            targetAxis = axis[period]
            break;

        case "1Y":
            targetData = chartData1Y
            targetAxis = axis[period]
            break;

        case "YTD":
            targetData = chartDataYTD
            targetAxis = axis[period]
            break;

        case "6M":
            targetData = chartData6M
            targetAxis = axis[period]
            break;

        case "3M":
            targetData = chartData3M
            targetAxis = axis[period]
            break;
    }

    var data = google.visualization.arrayToDataTable(targetData);

    var options = {
        width: 650,
        height: 320,
        // title: 'Price chart',
        curveType: 'function',
        legend: {
            position: (targetAxis.stockAxisMax === targetAxis.indexAxisMax) ? 'none' : "top",
            textStyle: {
                fontSize: 10,
            },
        },

        hAxis: {
            slantedText: true,
            slantedTextAngle: 90,
            textStyle: {
                fontSize: 10
            },

            0: {
                viewWindowMode: 'explicit',
                gridlines: {
                    color: 'lightgrey',
                    count: 7,
                },
            },

        },
        vAxes: {
            textStyle: {
                fontSize: 10
            },
            0: {
                viewWindowMode: 'explicit',
                viewWindow: {
                    max: targetAxis.stockAxisMax,
                    min: targetAxis.stockAxisMin
                },
                textStyle: {
                    fontSize: 10
                },
                gridlines: {
                    color: 'lightgrey',
                    count: 7,
                },
                minorGridlines: {
                    count: 0
                },
            },
            1: {
                viewWindowMode: 'explicit',
                viewWindow: {
                    max: targetAxis.indexAxisMax,
                    min: targetAxis.indexAxisMin
                },
                gridlines: {
                    color: 'transparent',
                },
                minorGridlines: {
                    count: 0
                },
                textStyle: {
                    fontSize: 10
                },
            },
        },
        series: {
            0: {

                targetAxisIndex: 0,
                lineWidth: 1,
                color: "#3366CC"

            },

            1: {
                targetAxisIndex: 1,
                lineWidth: 1,
                color: (targetAxis.stockAxisMax === targetAxis.indexAxisMax) ? 'transparent' : "#DC3912"
            },
        },
    }

    console.log(targetAxis.stockAxisMax === targetAxis.indexAxisMax)

    var chart = new google.visualization.LineChart(document.querySelector('.curve_chart'));
    chart.draw(data, options);
}

function generateChartData(chartDataObject) {
    chartData = []
    chartData1Y = []
    chartDataYTD = []
    chartData6M = []
    chartData3M = []

    let day = []
    day.push('date')
    day.push(chartDataObject[0].targetTicker + " (left)")
    day.push(chartDataObject[1].indexTicker + " (right)")

    chartData.push(day)

    chartData1Y.push(day)
    chartDataYTD.push(day)
    chartData6M.push(day)
    chartData3M.push(day)

    let stockPrice = 0
    let indexValue = 0

    let checkIfNoSecondLineNeeded = (noIndexChartDataNeedTickers.indexOf(chartDataObject[0].targetTicker) >= 0) ? true : false

    for (let q = 1; q < chartDataObject[0].tickerData.length; q++) {// build stock price data
        // -------------------------------------------------------------------------------------
        day = []
        let dateForStock = chartDataObject[0].tickerData[q][0]
        if (chartDataObject[0].tickerData[q][1] != "NaN") {
            day.push(dateForStock)
            stockPrice = parseFloat(chartDataObject[0].tickerData[q][1])
            day.push(stockPrice)
            if (!checkIfNoSecondLineNeeded) {
                let indexLine = chartDataObject[1].indexData.find(item => item[0] === dateForStock)


                try {
                    indexValue = parseFloat(indexLine[1])

                } catch (error) {
                    console.log('----------------------')
                    indexValue = undefined
                }

                day.push(indexValue)
            } else {
                day.push(stockPrice)
            }

            chartData.push(day)

            if (new Date(dateForStock).valueOf() >= minus1YearValue) chartData1Y.push(day) // serve for one year        
            if (new Date(dateForStock).valueOf() >= ytdDateValue) chartDataYTD.push(day) // serve for ytd        
            if (new Date(dateForStock).valueOf() >= minus6MonthValue) chartData6M.push(day) // serve for 6 months        
            if (new Date(dateForStock).valueOf() >= minus3MonthValue) chartData3M.push(day) // serve for 3 months  
        }

    }


    // serving chartData as 5Y

    generateAsixValues(chartData, '5Y')
    generateAsixValues(chartData1Y, '1Y')
    generateAsixValues(chartDataYTD, 'YTD')
    generateAsixValues(chartData6M, '6M')
    generateAsixValues(chartData3M, '3M')

    // -------------------------------------------------------------------------------------


    google.charts.setOnLoadCallback(drawChart);
}


function generateAsixValues(list, period) {

    let minOfMin = 0
    let maxOfMax = 0

    axis[period] = {}

    for (q = 1; q < list.length; q++) {
        let stockPrice = list[q][1]
        let indexValue = list[q][2]

        if (q === 1) {
            axis.stockStart = stockPrice
            axis.stockMin = stockPrice
            axis.stockMax = stockPrice
            axis.indexStart = indexValue
            axis.indexMin = indexValue
            axis.indexMax = indexValue

        } else {
            if (stockPrice > axis.stockMax) axis.stockMax = stockPrice
            if (stockPrice < axis.stockMin) axis.stockMin = stockPrice
            if (indexValue > axis.indexMax) axis.indexMax = indexValue
            if (indexValue < axis.indexMin) axis.indexMin = indexValue
        }
    }
    // generate mins and maxs for the stock
    let minOfStartForStock = axis.stockMin / axis.stockStart
    let maxOfStartForStock = axis.stockMax / axis.stockStart
    let minOfStartForIndex = axis.indexMin / axis.indexStart
    let maxOfStartForIndex = axis.indexMax / axis.indexStart
    if (minOfStartForStock < minOfStartForIndex) {
        minOfMin = minOfStartForStock * 0.97
    } else {
        minOfMin = minOfStartForIndex * 0.97
    }
    if (maxOfStartForStock > maxOfStartForIndex) {
        maxOfMax = maxOfStartForStock * 1.03
    } else {
        maxOfMax = maxOfStartForIndex * 1.03
    }

    axis[period].stockAxisMin = axis.stockStart * minOfMin
    axis[period].stockAxisMax = axis.stockStart * maxOfMax
    axis[period].indexAxisMin = axis.indexStart * minOfMin
    axis[period].indexAxisMax = axis.indexStart * maxOfMax

    /**
    // console.log('minOfStartForStock=', minOfStartForStock)
    // console.log('maxOfStartForStock', maxOfStartForStock)
    // console.log('minOfStartForIndex', minOfStartForIndex)
    // console.log('maxOfStartForIndex', maxOfStartForIndex)
    // console.log('minofmin=' + minOfMin)
    // console.log('maxofmax=' + maxOfMax)
     */
}



