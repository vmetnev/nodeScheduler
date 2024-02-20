
function dict(object, service) {
    console.log(object)

    try {
        if (service === "country") return object.data.assetProfile.country
    if (service === "industry") return object.data.assetProfile.industry
    if (service === "sector") return object.data.assetProfile.sector
    if (service === "website") return object.data.assetProfile.website
    if (service === "longBusinessSummary") return object.data.assetProfile.longBusinessSummary
    if (service === "fullTimeEmployees") return object.data.assetProfile.fullTimeEmployees

    if (service === "earningsDate") return object.data.calendarEvents.earningsDate
    if (service === "earningsAverage") return object.data.calendarEvents.earningsAverage
    if (service === "earningsLow") return object.data.calendarEvents.earningsLow
    if (service === "earningsHigh") return object.data.calendarEvents.earningsHigh
    if (service === "revenueAverage") return object.data.calendarEvents.revenueAverage
    if (service === "revenueLow") return object.data.calendarEvents.revenueLow
    if (service === "revenueHigh") return object.data.calendarEvents.revenueHigh
    if (service === "status") return object.data.calendarEvents.status

    if (service === "min") return object.data.fiveYearPriceData.min
    if (service === "max") return object.data.fiveYearPriceData.max

    if (service === "enterpriseValue") return object.data.defaultKeyStatistics.enterpriseValue
    if (service === "forwardPE") return object.data.defaultKeyStatistics.forwardPE
    if (service === "profitMargins") return object.data.defaultKeyStatistics.profitMargins
    if (service === "floatShares") return object.data.defaultKeyStatistics.floatShares
    if (service === "sharesOutstanding") return object.data.defaultKeyStatistics.sharesOutstanding
    if (service === "sharesShort") return object.data.defaultKeyStatistics.sharesShort
    if (service === "sharesShortPriorMonth") return object.data.defaultKeyStatistics.sharesShortPriorMonth
    if (service === "shortRatio") return object.data.defaultKeyStatistics.shortRatio
    if (service === "shortPercentOfFloat") return object.data.defaultKeyStatistics.shortPercentOfFloat
    if (service === "beta") return object.data.defaultKeyStatistics.beta
    if (service === "priceToBook") return object.data.defaultKeyStatistics.priceToBook
    if (service === "lastFiscalYearEnd") return object.data.defaultKeyStatistics.lastFiscalYearEnd
    if (service === "nextFiscalYearEnd") return object.data.defaultKeyStatistics.nextFiscalYearEnd
    if (service === "mostRecentQuarter") return object.data.defaultKeyStatistics.mostRecentQuarter
    if (service === "netIncomeToCommon") return object.data.defaultKeyStatistics.netIncomeToCommon
    if (service === "trailingEps") return object.data.defaultKeyStatistics.trailingEps
    if (service === "forwardEps") return object.data.defaultKeyStatistics.forwardEps
    if (service === "enterpriseToRevenue") return object.data.defaultKeyStatistics.enterpriseToRevenue
    if (service === "enterpriseToEbitda") return object.data.defaultKeyStatistics.enterpriseToEbitda



    if (service === "52WeekChange") {
        console.log(object.data.defaultKeyStatistics['52WeekChange'])
        return Number(object.data.defaultKeyStatistics['52WeekChange'])
    }

    if (service === "earnHistPeriodMinus1Q") return object.data.earningsHistory.earnHistPeriodMinus1Q
    if (service === "earnHistQuarterEndMinus1Q") return object.data.earningsHistory.earnHistQuarterEndMinus1Q
    if (service === "earnHistEpsActualMinus1Q") return object.data.earningsHistory.earnHistEpsActualMinus1Q
    if (service === "earnHistEpsEstimateMinus1Q") return object.data.earningsHistory.earnHistEpsEstimateMinus1Q
    if (service === "earnHistDiffMinus1Q") return object.data.earningsHistory.earnHistDiffMinus1Q
    if (service === "earnHistPeriodMinus2Q") return object.data.earningsHistory.earnHistPeriodMinus2Q
    if (service === "earnHistQuarterEndMinus2Q") return object.data.earningsHistory.earnHistQuarterEndMinus2Q
    if (service === "earnHistEpsActualMinus2Q") return object.data.earningsHistory.earnHistEpsActualMinus2Q
    if (service === "earnHistEpsEstimateMinus2Q") return object.data.earningsHistory.earnHistEpsEstimateMinus2Q
    if (service === "earnHistDiffMinus2Q") return object.data.earningsHistory.earnHistDiffMinus2Q
    if (service === "earnHistPeriodMinus3Q") return object.data.earningsHistory.earnHistPeriodMinus3Q
    if (service === "earnHistQuarterEndMinus3Q") return object.data.earningsHistory.earnHistQuarterEndMinus3Q
    if (service === "earnHistEpsActualMinus3Q") return object.data.earningsHistory.earnHistEpsActualMinus3Q
    if (service === "earnHistEpsEstimateMinus3Q") return object.data.earningsHistory.earnHistEpsEstimateMinus3Q
    if (service === "earnHistDiffMinus3Q") return object.data.earningsHistory.earnHistDiffMinus3Q
    if (service === "earnHistPeriodMinus4Q") return object.data.earningsHistory.earnHistPeriodMinus4Q
    if (service === "earnHistQuarterEndMinus4Q") return object.data.earningsHistory.earnHistQuarterEndMinus4Q
    if (service === "earnHistEpsActualMinus4Q") return object.data.earningsHistory.earnHistEpsActualMinus4Q
    if (service === "earnHistEpsEstimateMinus4Q") return object.data.earningsHistory.earnHistEpsEstimateMinus4Q
    if (service === "earnHistDiffMinus4Q") return object.data.earningsHistory.earnHistDiffMinus4Q

    if (service === "earningsPeriodY0") return object.data.earningsTrend.earningsPeriodY0
    if (service === "earningsEndDateY0") return object.data.earningsTrend.earningsEndDateY0
    if (service === "earningsEstimateAverageY0") return object.data.earningsTrend.earningsEstimateAverageY0
    if (service === "yearAgoEPSY0") return object.data.earningsTrend.yearAgoEPSY0
    if (service === "earningsEstimateGrowthY0") return object.data.earningsTrend.earningsEstimateGrowthY0
    if (service === "numberOfAnalystsEpsEstimateY0") return object.data.earningsTrend.numberOfAnalystsEpsEstimateY0
    if (service === "revenueEstimateAverageY0") return object.data.earningsTrend.revenueEstimateAverageY0
    if (service === "yearAgoRevenueY0") return object.data.earningsTrend.yearAgoRevenueY0
    if (service === "revenueEstimateGrowthY0") return object.data.earningsTrend.revenueEstimateGrowthY0
    if (service === "numberOfAnalystsRevenueEstimateY0") return object.data.earningsTrend.numberOfAnalystsRevenueEstimateY0
    if (service === "epsTrendCurrentY0") return object.data.earningsTrend.epsTrendCurrentY0
    if (service === "epsTrend7DaysAgoY0") return object.data.earningsTrend.epsTrend7DaysAgoY0
    if (service === "epsTrend30DaysAgoY0") return object.data.earningsTrend.epsTrend30DaysAgoY0
    if (service === "epsTrend90DaysAgoY0") return object.data.earningsTrend.epsTrend90DaysAgoY0
    if (service === "earningsPeriodY1") return object.data.earningsTrend.earningsPeriodY1
    if (service === "earningsEndDateY1") return object.data.earningsTrend.earningsEndDateY1
    if (service === "earningsEstimateAverageY1") return object.data.earningsTrend.earningsEstimateAverageY1
    if (service === "yearAgoEPSY1") return object.data.earningsTrend.yearAgoEPSY1
    if (service === "earningsEstimateGrowthY1") return object.data.earningsTrend.earningsEstimateGrowthY1
    if (service === "numberOfAnalystsEpsEstimateY1") return object.data.earningsTrend.numberOfAnalystsEpsEstimateY1
    if (service === "revenueEstimateAverageY1") return object.data.earningsTrend.revenueEstimateAverageY1
    if (service === "yearAgoRevenueY1") return object.data.earningsTrend.yearAgoRevenueY1
    if (service === "revenueEstimateGrowthY1") return object.data.earningsTrend.revenueEstimateGrowthY1
    if (service === "numberOfAnalystsRevenueEstimateY1") return object.data.earningsTrend.numberOfAnalystsRevenueEstimateY1
    if (service === "epsTrendCurrentY1") return object.data.earningsTrend.epsTrendCurrentY1
    if (service === "epsTrend7DaysAgoY1") return object.data.earningsTrend.epsTrend7DaysAgoY1
    if (service === "epsTrend30DaysAgoY1") return object.data.earningsTrend.epsTrend30DaysAgoY1
    if (service === "epsTrend90DaysAgoY1") return object.data.earningsTrend.epsTrend90DaysAgoY1
    if (service === "earningsPeriodQ0") return object.data.earningsTrend.earningsPeriodQ0
    if (service === "earningsEndDateQ0") return object.data.earningsTrend.earningsEndDateQ0
    if (service === "earningsEstimateAverageQ0") return object.data.earningsTrend.earningsEstimateAverageQ0
    if (service === "yearAgoEPSQ0") return object.data.earningsTrend.yearAgoEPSQ0
    if (service === "earningsEstimateGrowthQ0") return object.data.earningsTrend.earningsEstimateGrowthQ0
    if (service === "numberOfAnalystsEpsEstimateQ0") return object.data.earningsTrend.numberOfAnalystsEpsEstimateQ0
    if (service === "revenueEstimateAverageQ0") return object.data.earningsTrend.revenueEstimateAverageQ0
    if (service === "yearAgoRevenueQ0") return object.data.earningsTrend.yearAgoRevenueQ0
    if (service === "revenueEstimateGrowthQ0") return object.data.earningsTrend.revenueEstimateGrowthQ0
    if (service === "numberOfAnalystsRevenueEstimateQ0") return object.data.earningsTrend.numberOfAnalystsRevenueEstimateQ0
    if (service === "epsTrendCurrentQ0") return object.data.earningsTrend.epsTrendCurrentQ0
    if (service === "epsTrend7DaysAgoQ0") return object.data.earningsTrend.epsTrend7DaysAgoQ0
    if (service === "epsTrend30DaysAgoQ0") return object.data.earningsTrend.epsTrend30DaysAgoQ0
    if (service === "epsTrend90DaysAgoQ0") return object.data.earningsTrend.epsTrend90DaysAgoQ0
    if (service === "earningsPeriodQ1") return object.data.earningsTrend.earningsPeriodQ1
    if (service === "earningsEndDateQ1") return object.data.earningsTrend.earningsEndDateQ1
    if (service === "earningsEstimateAverageQ1") return object.data.earningsTrend.earningsEstimateAverageQ1
    if (service === "yearAgoEPSQ1") return object.data.earningsTrend.yearAgoEPSQ1
    if (service === "earningsEstimateGrowthQ1") return object.data.earningsTrend.earningsEstimateGrowthQ1
    if (service === "numberOfAnalystsEpsEstimateQ1") return object.data.earningsTrend.numberOfAnalystsEpsEstimateQ1
    if (service === "revenueEstimateAverageQ1") return object.data.earningsTrend.revenueEstimateAverageQ1
    if (service === "yearAgoRevenueQ1") return object.data.earningsTrend.yearAgoRevenueQ1
    if (service === "revenueEstimateGrowthQ1") return object.data.earningsTrend.revenueEstimateGrowthQ1
    if (service === "numberOfAnalystsRevenueEstimateQ1") return object.data.earningsTrend.numberOfAnalystsRevenueEstimateQ1
    if (service === "epsTrendCurrentQ1") return object.data.earningsTrend.epsTrendCurrentQ1
    if (service === "epsTrend7DaysAgoQ1") return object.data.earningsTrend.epsTrend7DaysAgoQ1
    if (service === "epsTrend30DaysAgoQ1") return object.data.earningsTrend.epsTrend30DaysAgoQ1
    if (service === "epsTrend90DaysAgoQ1") return object.data.earningsTrend.epsTrend90DaysAgoQ1

    if (service === "currentPrice") return object.data.financialData.currentPrice
    if (service === "targetHighPrice") return object.data.financialData.targetHighPrice
    if (service === "targetLowPrice") return object.data.financialData.targetLowPrice
    if (service === "targetMeanPrice") return object.data.financialData.targetMeanPrice
    if (service === "targetMedianPrice") return object.data.financialData.targetMedianPrice
    if (service === "recommendationMean") return object.data.financialData.recommendationMean
    if (service === "recommendationKey") return object.data.financialData.recommendationKey
    if (service === "numberOfAnalystOpinions") return object.data.financialData.numberOfAnalystOpinions
    if (service === "totalCash") return object.data.financialData.totalCash
    if (service === "totalCashPerShare") return object.data.financialData.totalCashPerShare
    if (service === "ebitda") return object.data.financialData.ebitda
    if (service === "totalDebt") return object.data.financialData.totalDebt
    if (service === "totalRevenue") return object.data.financialData.totalRevenue
    if (service === "debtToEquity") return object.data.financialData.debtToEquity
    if (service === "revenuePerShare") return object.data.financialData.revenuePerShare
    if (service === "returnOnAssets") return object.data.financialData.returnOnAssets
    if (service === "returnOnEquity") return object.data.financialData.returnOnEquity
    if (service === "freeCashflow") return object.data.financialData.freeCashflow
    if (service === "operatingCashflow") return object.data.financialData.operatingCashflow
    if (service === "earningsGrowth") return object.data.financialData.earningsGrowth
    if (service === "revenueGrowth") return object.data.financialData.revenueGrowth
    if (service === "grossMargins") return object.data.financialData.grossMargins
    if (service === "ebitdaMargins") return object.data.financialData.ebitdaMargins
    if (service === "operatingMargins") return object.data.financialData.operatingMargins
    if (service === "profitMargins") return object.data.financialData.profitMargins
    if (service === "financialCurrency") return object.data.financialData.financialCurrency

    if (service === "preMarketChangePercent") return object.data.priceModule.preMarketChangePercent
    if (service === "preMarketPrice") return object.data.priceModule.preMarketPrice
    if (service === "postMarketPrice") return object.data.priceModule.postMarketPrice
    if (service === "regularMarketChangePercent") return object.data.priceModule.regularMarketChangePercent
    if (service === "regularMarketTime") return object.data.priceModule.regularMarketTime
    if (service === "regularMarketPrice") return object.data.priceModule.regularMarketPrice
    if (service === "regularMarketDayHigh") return object.data.priceModule.regularMarketDayHigh
    if (service === "regularMarketDayLow") return object.data.priceModule.regularMarketDayLow
    if (service === "regularMarketVolume") return object.data.priceModule.regularMarketVolume
    if (service === "regularMarketPreviousClose") return object.data.priceModule.regularMarketPreviousClose
    if (service === "marketState") return object.data.priceModule.marketState
    if (service === "quoteType") return object.data.priceModule.quoteType
    if (service === "symbol") return object.data.priceModule.symbol
    if (service === "longName") return object.data.priceModule.longName
    if (service === "tradingCurrency") return object.data.priceModule.tradingCurrency
    if (service === "marketCap") return object.data.priceModule.marketCap

    if (service === "dateMinus7DDate") return object.data.priceObject.dateMinus7DDate
    if (service === "dateMinus7DPrice") return object.data.priceObject.dateMinus7DPrice
    if (service === "dateMinus1MDate") return object.data.priceObject.dateMinus1MDate
    if (service === "dateMinus1MPrice") return object.data.priceObject.dateMinus1MPrice
    if (service === "dateMinus3MDate") return object.data.priceObject.dateMinus3MDate
    if (service === "dateMinus3MPrice") return object.data.priceObject.dateMinus3MPrice
    if (service === "dateMinus6MDate") return object.data.priceObject.dateMinus6MDate
    if (service === "dateMinus6MPrice") return object.data.priceObject.dateMinus6MPrice
    if (service === "dateMinus12MDate") return object.data.priceObject.dateMinus12MDate
    if (service === "dateMinus12MPrice") return object.data.priceObject.dateMinus12MPrice
    if (service === "dateYTDDate") return object.data.priceObject.dateYTDDate
    if (service === "dateYTDPrice") return object.data.priceObject.dateYTDPrice
    if (service === "lastPriceDate") return object.data.priceObject.lastPriceDate
    
    if (service === "lastPrice") return object.data.priceObject.lastPrice
    if (service === "lastprice") return object.data.priceObject.lastprice
    
    if (service === "previousDayPrice") return object.data.priceObject.previousDayPrice
    if (service === "previousDayDate") return object.data.priceObject.previousDayDate
    if (service === "perf1D") return object.data.priceObject.perf1D
    if (service === "perf1W") return object.data.priceObject.perf1W
    if (service === "perf1M") return object.data.priceObject.perf1M
    if (service === "perf3M") return object.data.priceObject.perf3M
    if (service === "perf6M") return object.data.priceObject.perf6M
    if (service === "perf12M") return object.data.priceObject.perf12M
    if (service === "perfYTD") return object.data.priceObject.perfYTD
    if (service === "low52Date") return object.data.priceObject.low52Date
    if (service === "low52Price") return object.data.priceObject.low52Price
    if (service === "high52Date") return object.data.priceObject.high52Date
    if (service === "high52Price") return object.data.priceObject.high52Price

    if (service === "recPeriod0") return object.data.recommendationTrend.recPeriod0
    if (service === "strongBuy0") return object.data.recommendationTrend.strongBuy0
    if (service === "buy0") return object.data.recommendationTrend.buy0
    if (service === "hold0") return object.data.recommendationTrend.hold0
    if (service === "sell0") return object.data.recommendationTrend.sell0
    if (service === "strongSell0") return object.data.recommendationTrend.strongSell0
    if (service === "recPeriodMinus1M") return object.data.recommendationTrend.recPeriodMinus1M
    if (service === "strongBuyMinus1M") return object.data.recommendationTrend.strongBuyMinus1M
    if (service === "buyMinus1M") return object.data.recommendationTrend.buyMinus1M
    if (service === "holdMinus1M") return object.data.recommendationTrend.holdMinus1M
    if (service === "sellMinus1M") return object.data.recommendationTrend.sellMinus1M
    if (service === "strongSellMinus1M") return object.data.recommendationTrend.strongSellMinus1M
    if (service === "recPeriodMinus2M") return object.data.recommendationTrend.recPeriodMinus2M
    if (service === "strongBuyMinus2M") return object.data.recommendationTrend.strongBuyMinus2M
    if (service === "buyMinus2M") return object.data.recommendationTrend.buyMinus2M
    if (service === "holdMinus2M") return object.data.recommendationTrend.holdMinus2M
    if (service === "sellMinus2M") return object.data.recommendationTrend.sellMinus2M
    if (service === "strongSellMinus2M") return object.data.recommendationTrend.strongSellMinus2M
    if (service === "recPeriodMinus3M") return object.data.recommendationTrend.recPeriodMinus3M
    if (service === "strongBuyMinus3M") return object.data.recommendationTrend.strongBuyMinus3M
    if (service === "buyMinus3M") return object.data.recommendationTrend.buyMinus3M
    if (service === "holdMinus3M") return object.data.recommendationTrend.holdMinus3M
    if (service === "sellMinus3M") return object.data.recommendationTrend.sellMinus3M
    if (service === "strongSellMinus3M") return object.data.recommendationTrend.strongSellMinus3M

    if (service === "averageDailyVolume10Day") return object.data.summaryDetail.averageDailyVolume10Day
    if (service === "summaryBeta") return object.data.summaryDetail.summaryBeta
    if (service === "dayHigh") return object.data.summaryDetail.dayHigh
    if (service === "dayLow") return object.data.summaryDetail.dayLow
    if (service === "dividendRate") return object.data.summaryDetail.dividendRate
    if (service === "dividendYield") return object.data.summaryDetail.dividendYield
    if (service === "fiftyDayAverage") return object.data.summaryDetail.fiftyDayAverage
    if (service === "fiftyTwoWeekHigh") return object.data.summaryDetail.fiftyTwoWeekHigh
    if (service === "fiftyTwoWeekLow") return object.data.summaryDetail.fiftyTwoWeekLow
    if (service === "fiveYearAvgDividendYield") return object.data.summaryDetail.fiveYearAvgDividendYield
    if (service === "summaryForwardPE") return object.data.summaryDetail.summaryForwardPE
    if (service === "summaryMarketCap") return object.data.summaryDetail.summaryMarketCap
    if (service === "openPrice") return object.data.summaryDetail.openPrice
    if (service === "payoutRatio") return object.data.summaryDetail.payoutRatio
    if (service === "previousClose") return object.data.summaryDetail.previousClose
    if (service === "summaryRegularMarketDayHigh") return object.data.summaryDetail.summaryRegularMarketDayHigh
    if (service === "summaryRegularMarketDayLow") return object.data.summaryDetail.summaryRegularMarketDayLow
    if (service === "regularMarketOpen") return object.data.summaryDetail.regularMarketOpen
    if (service === "summaryRegularMarketPreviousClose") return object.data.summaryDetail.summaryRegularMarketPreviousClose
    if (service === "trailingAnnualDividendRate") return object.data.summaryDetail.trailingAnnualDividendRate
    if (service === "trailingAnnualDividendYield") return object.data.summaryDetail.trailingAnnualDividendYield
    if (service === "trailingPE") return object.data.summaryDetail.trailingPE
    if (service === "twoHundredDayAverage") return object.data.summaryDetail.twoHundredDayAverage

    if (service === "firstDate") return object.data.fiveYearPriceData.data[0][0]



    if (service === "report_ticker") return object.report.ticker
    if (service === "report_dateReportY0") return object.report.dateReportY0
    if (service === "report_fiscalYearY0") return object.report.fiscalYearY0
    if (service === "report_revenueY0") return object.report.revenueY0
    if (service === "report_ebitY0") return object.report.ebitY0
    if (service === "report_epsY0") return object.report.epsY0
    if (service === "report_dateReportY1") return object.report.dateReportY1
    if (service === "report_fiscalYearY1") return object.report.fiscalYearY1
    if (service === "report_revenueY1") return object.report.revenueY1
    if (service === "report_ebitY1") return object.report.ebitY1
    if (service === "report_epsY1") return object.report.epsY1
    if (service === "report_dateReportY2") return object.report.dateReportY2
    if (service === "report_fiscalYearY2") return object.report.fiscalYearY2
    if (service === "report_revenueY2") return object.report.revenueY2
    if (service === "report_ebitY2") return object.report.ebitY2
    if (service === "report_epsY2") return object.report.epsY2
    if (service === "report_dateReportY3") return object.report.dateReportY3
    if (service === "report_fiscalYearY3") return object.report.fiscalYearY3
    if (service === "report_revenueY3") return object.report.revenueY3
    if (service === "report_ebitY3") return object.report.ebitY3
    if (service === "report_epsY3") return object.report.epsY3
    if (service === "report_dateReportY4") return object.report.dateReportY4
    if (service === "report_fiscalYearY4") return object.report.fiscalYearY4
    if (service === "report_revenueY4") return object.report.revenueY4
    if (service === "report_ebitY4") return object.report.ebitY4
    if (service === "report_epsY4") return object.report.epsY4
    if (service === "report_dateReportY5") return object.report.dateReportY5
    if (service === "report_fiscalYearY5") return object.report.fiscalYearY5
    if (service === "report_revenueY5") return object.report.revenueY5
    if (service === "report_ebitY5") return object.report.ebitY5
    if (service === "report_epsY5") return object.report.epsY5


    return "check service name provided"
    } catch (error) {
        console.log(error)
        return'error'
    }

    

}

module.exports = dict