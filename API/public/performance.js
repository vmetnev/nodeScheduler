// ETF Sort buttons and handler
const etfBtn1Y = document.querySelector('.etf-perf1y').addEventListener('click', etfSort)
const etfBtnYTD = document.querySelector('.etf-perfytd').addEventListener('click', etfSort)
const etfBtn6M = document.querySelector('.etf-perf6m').addEventListener('click', etfSort)
const etfBtn3M = document.querySelector('.etf-perf3m').addEventListener('click', etfSort)
const etfBtn1M = document.querySelector('.etf-perf1m').addEventListener('click', etfSort)
const etfBtn1W = document.querySelector('.etf-perf1w').addEventListener('click', etfSort)
const etfBtn1D = document.querySelector('.etf-perf1d').addEventListener('click', etfSort)

// Company Sort buttons and handler
const companyBtnMc = document.querySelector('.mc').addEventListener('click', companyObjectSort)
const companyBtn1Y = document.querySelector('.perf1y').addEventListener('click', companyObjectSort)
const companyBtnYTD = document.querySelector('.ytd').addEventListener('click', companyObjectSort)
const companyBtn6M = document.querySelector('.perf6m').addEventListener('click', companyObjectSort)
const companyBtn3M = document.querySelector('.perf3m').addEventListener('click', companyObjectSort)
const companyBtn1M = document.querySelector('.perf1m').addEventListener('click', companyObjectSort)
const companyBtn1W = document.querySelector('.perf1w').addEventListener('click', companyObjectSort)
const companyBtn1D = document.querySelector('.perf1d').addEventListener('click', companyObjectSort)

// Global objects --
let sectorETFs = []
let companies = []
let sectors = {}
let rightTableObject = []
// -----------------

function etfSort(evt) {
    let typeSort = evt.target.textContent
    console.log(typeSort)

    // Можно ли здесь отсортировать ??

    switch (typeSort) {
        case "1D":
            sectorETFs.sort(function (a, b) {
                return parseFloat(b.perf1D) - parseFloat(a.perf1D)
            })
            makeSectorETFs(sectorETFs)
            break
        case "1W":
            sectorETFs.sort(function (a, b) {
                return parseFloat(b.perf1W) - parseFloat(a.perf1W)
            })
            console.log(sectorETFs)
            makeSectorETFs(sectorETFs)
            break
        case "1M":
            sectorETFs.sort(function (a, b) {
                return parseFloat(b.perf1M) - parseFloat(a.perf1M)
            })
            console.log(sectorETFs)
            makeSectorETFs(sectorETFs)
            break
        case "3M":
            sectorETFs.sort(function (a, b) {
                return parseFloat(b.perf3M) - parseFloat(a.perf3M)
            })
            console.log(sectorETFs)
            makeSectorETFs(sectorETFs)
            break
        case "6M":
            sectorETFs.sort(function (a, b) {
                return parseFloat(b.perf6M) - parseFloat(a.perf6M)
            })
            console.log(sectorETFs)
            makeSectorETFs(sectorETFs)
            break
        case "YTD":
            sectorETFs.sort(function (a, b) {
                return parseFloat(b.perfYTD) - parseFloat(a.perfYTD)
            })
            console.log(sectorETFs)
            makeSectorETFs(sectorETFs)
            break
        case "1Y":
            sectorETFs.sort(function (a, b) {
                return parseFloat(b.perf12M) - parseFloat(a.perf12M)
            })
            console.log(sectorETFs)
            makeSectorETFs(sectorETFs)
            break
        default:
            break
    }
}

getPerformanceData()

async function getPerformanceData() {
    let url = 'http://127.0.0.1:3003/performance/allData'
    console.log('pending fentch')
    let resp = await fetch(url)
    resp = await resp.json()
    console.log(resp)
    console.log('fentch completed')

    localStorage.setItem('collectionName', JSON.stringify(resp.collectionName))

    resp.data.forEach(company => localStorage.setItem(company.ticker, JSON.stringify(company)))


    document.querySelector('.collection-name').textContent = "  " + resp.collectionName

    // make flat structure
    resp.data.forEach(company => companies.push(makeFlat(company)))

    console.log(companies[0])

    localStorage.companies = companies.toString()

    let spx = companies.find(obj => { return obj.ticker === "^GSPC" })
    let ccmp = companies.find(obj => { return obj.ticker === "^IXIC" })

    sectorETFs = [
        companies.find(obj => { return obj.ticker === "XLC" }),
        companies.find(obj => { return obj.ticker === "XLY" }),
        companies.find(obj => { return obj.ticker === "XLP" }),
        companies.find(obj => { return obj.ticker === "XLE" }),
        companies.find(obj => { return obj.ticker === "XLF" }),
        companies.find(obj => { return obj.ticker === "XLV" }),
        companies.find(obj => { return obj.ticker === "XLI" }),
        companies.find(obj => { return obj.ticker === "XLB" }),
        companies.find(obj => { return obj.ticker === "XLRE" }),
        companies.find(obj => { return obj.ticker === "XLK" }),
        companies.find(obj => { return obj.ticker === "XLU" }),
    ]

    makeSPX(spx)
    makeCCMP(ccmp)
    makeSectorETFs(sectorETFs)
    console.log(sectorETFs)
    showSectorsAndIndustries()
}

function makeSectorETFs(arr) {

    // Here we should be removing existing tr with class etf

    let target = document.querySelector('.sector-etf-table')
    let etfRowsToDelete = target.querySelectorAll('.etf')
    if (etfRowsToDelete) {
        etfRowsToDelete.forEach(row => row.remove())
    }

    arr.forEach(etf => {

        let row = document.createElement('tr')
        row.classList.add('etf')
        row.classList.add(etf.ticker)
        // ----------------------------------
        let td = document.createElement('td')
        td.innerHTML = etf.ticker
        row.appendChild(td)
        // ----------------------------------
        td = document.createElement('td')
        td.innerHTML = etf.longName
        row.appendChild(td)
        // ----------------------------------
        td = document.createElement('td')
        td.innerHTML = etf.lastPrice.toFixed(2)
        td.classList.add('right')
        row.appendChild(td)

        // ----------------------------------
        td = document.createElement('td')
        td.innerHTML = etf.perf12M
        td.classList.add('etf-perf12M')
        if (etf.perf12M[0] === "-") {
            td.classList.add('red')
        } else {
            td.classList.add('green')
        }
        td.classList.add('right')
        row.appendChild(td)
        // ----------------------------------
        td = document.createElement('td')
        td.innerHTML = etf.perfYTD
        td.classList.add('etf-perfYTD')
        if (etf.perfYTD[0] === "-") {
            td.classList.add('red')
        } else {
            td.classList.add('green')
        }
        td.classList.add('right')
        row.appendChild(td)
        // ----------------------------------
        td = document.createElement('td')
        td.innerHTML = etf.perf6M
        td.classList.add('etf-perf6M')
        if (etf.perf6M[0] === "-") {
            td.classList.add('red')
        } else {
            td.classList.add('green')
        }
        td.classList.add('right')
        row.appendChild(td)
        // ----------------------------------
        td = document.createElement('td')
        td.innerHTML = etf.perf3M
        td.classList.add('etf-perf3M')
        if (etf.perf3M[0] === "-") {
            td.classList.add('red')
        } else {
            td.classList.add('green')
        }
        td.classList.add('right')
        row.appendChild(td)
        // ----------------------------------
        td = document.createElement('td')
        td.innerHTML = etf.perf1M
        td.classList.add('etf-perf1M')
        if (etf.perf1M[0] === "-") {
            td.classList.add('red')
        } else {
            td.classList.add('green')
        }
        td.classList.add('right')
        row.appendChild(td)
        // ----------------------------------
        td = document.createElement('td')
        td.innerHTML = etf.perf1W
        td.classList.add('etf-perf1W')
        if (etf.perf1W[0] === "-") {
            td.classList.add('red')
        } else {
            td.classList.add('green')
        }
        td.classList.add('right')
        row.appendChild(td)
        // ----------------------------------
        td = document.createElement('td')
        td.innerHTML = etf.perf1D
        td.classList.add('etf-perf1D')
        if (etf.perf1D[0] === "-") {
            td.classList.add('red')
        } else {
            td.classList.add('green')
        }
        td.classList.add('right')
        row.appendChild(td)
        document.querySelector('.sector-etf-table').appendChild(row)
    })
}

function makeSPX(obj) {

    document.querySelector('.lastpricedate').textContent = obj.lastPriceDate


    if (typeof obj.lastPrice === "number") {
        document.querySelector('.sandp-last-price').textContent = obj.lastPrice.toFixed(2)
    } else {
        document.querySelector('.sandp-last-price').textContent = obj.lastPrice
    }


    document.querySelector('.sandp-1y').textContent = obj.perf12M
    if (obj.perf12M[0] === "-") {
        document.querySelector('.sandp-1y').classList.add('red')
    } else {
        document.querySelector('.sandp-1y').classList.add('green')
    }

    document.querySelector('.sandp-ytd').textContent = obj.perfYTD
    if (obj.perfYTD[0] === "-") {
        document.querySelector('.sandp-ytd').classList.add('red')
    } else {
        document.querySelector('.sandp-ytd').classList.add('green')
    }

    document.querySelector('.sandp-6m').textContent = obj.perf6M
    if (obj.perf6M[0] === "-") {
        document.querySelector('.sandp-6m').classList.add('red')
    } else {
        document.querySelector('.sandp-6m').classList.add('green')
    }

    document.querySelector('.sandp-3m').textContent = obj.perf3M
    if (obj.perf3M[0] === "-") {
        document.querySelector('.sandp-3m').classList.add('red')
    } else {
        document.querySelector('.sandp-3m').classList.add('green')
    }

    document.querySelector('.sandp-1m').textContent = obj.perf1M
    if (obj.perf1M[0] === "-") {
        document.querySelector('.sandp-1m').classList.add('red')
    } else {
        document.querySelector('.sandp-1m').classList.add('green')
    }

    document.querySelector('.sandp-1w').textContent = obj.perf1W
    if (obj.perf1W[0] === "-") {
        document.querySelector('.sandp-1w').classList.add('red')
    } else {
        document.querySelector('.sandp-1w').classList.add('green')
    }

    document.querySelector('.sandp-1d').textContent = obj.perf1D
    if (obj.perf1D[0] === "-") {
        document.querySelector('.sandp-1d').classList.add('red')
    } else {
        document.querySelector('.sandp-1d').classList.add('green')
    }

}

function makeCCMP(obj) {
    if (typeof obj.lastPrice === "number") {
        document.querySelector('.nasdaq-last-price').textContent = obj.lastPrice.toFixed(2)
    } else {
        document.querySelector('.nasdaq-last-price').textContent = obj.lastPrice
    }

    document.querySelector('.nasdaq-1y').textContent = obj.perf12M
    if (obj.perf12M[0] === "-") {
        document.querySelector('.nasdaq-1y').classList.add('red')
    } else {
        document.querySelector('.nasdaq-1y').classList.add('green')
    }

    document.querySelector('.nasdaq-ytd').textContent = obj.perfYTD
    if (obj.perfYTD[0] === "-") {
        document.querySelector('.nasdaq-ytd').classList.add('red')
    } else {
        document.querySelector('.nasdaq-ytd').classList.add('green')
    }


    document.querySelector('.nasdaq-6m').textContent = obj.perf6M
    if (obj.perf6M[0] === "-") {
        document.querySelector('.nasdaq-6m').classList.add('red')
    } else {
        document.querySelector('.nasdaq-6m').classList.add('green')
    }


    document.querySelector('.nasdaq-3m').textContent = obj.perf3M
    if (obj.perf3M[0] === "-") {
        document.querySelector('.nasdaq-3m').classList.add('red')
    } else {
        document.querySelector('.nasdaq-3m').classList.add('green')
    }

    document.querySelector('.nasdaq-1m').textContent = obj.perf1M
    if (obj.perf1M[0] === "-") {
        document.querySelector('.nasdaq-1m').classList.add('red')
    } else {
        document.querySelector('.nasdaq-1m').classList.add('green')
    }

    document.querySelector('.nasdaq-1w').textContent = obj.perf1W
    if (obj.perf1W[0] === "-") {
        document.querySelector('.nasdaq-1w').classList.add('red')
    } else {
        document.querySelector('.nasdaq-1w').classList.add('green')
    }

    document.querySelector('.nasdaq-1d').textContent = obj.perf1D
    if (obj.perf1D[0] === "-") {
        document.querySelector('.nasdaq-1d').classList.add('red')
    } else {
        document.querySelector('.nasdaq-1d').classList.add('green')
    }

}

function makeFlat(company) {
    let instance = {}

    // Flat data
    instance.ticker = company.ticker
    instance.id = company._id
    instance.date = company.data.date
    // Data Asset profile
    instance.country = (company.data.assetProfile?.country) ? company.data.assetProfile.country : "n.a."
    instance.fullTimeEmployees = (company.data.assetProfile?.fullTimeEmployees) ? company.data.assetProfile.fullTimeEmployees : "n.a."
    instance.longBusinessSummary = (company.data.assetProfile?.longBusinessSummary) ? company.data.assetProfile.longBusinessSummary : "n.a."
    instance.sector = (company.data.assetProfile?.sector) ? company.data.assetProfile.sector : "n.a."

    instance.industry = (company.data.assetProfile?.industry) ? company.data.assetProfile.industry : "n.a."


    instance.website = (company.data.assetProfile?.website) ? company.data.assetProfile.website : "n.a."
    // Data Calendar Events
    instance.earningsAverage = (company.data.calendarEvents?.earningsAverage) ? company.data.calendarEvents.earningsAverage : "n.a."
    instance.earningsDate = (company.data.calendarEvents?.earningsDate) ? company.data.calendarEvents.earningsDate : "n.a."
    instance.earningsHigh = (company.data.calendarEvents?.earningsHigh) ? company.data.calendarEvents.earningsHigh : "n.a."
    instance.earningsLow = (company.data.calendarEvents?.earningsLow) ? company.data.calendarEvents.earningsLow : "n.a."
    instance.revenueAverage = (company.data.calendarEvents?.revenueAverage) ? company.data.calendarEvents.revenueAverage : "n.a."
    instance.revenueHigh = (company.data.calendarEvents?.revenueHigh) ? company.data.calendarEvents.revenueHigh : "n.a."
    instance.revenueLow = (company.data.calendarEvents?.revenueLow) ? company.data.calendarEvents.revenueLow : "n.a."

    // Data Price Module
    instance.longName = (company.data.priceModule?.longName) ? company.data.priceModule.longName : "n.a."
    instance.marketCap = (company.data.priceModule?.marketCap) ? Math.round(company.data.priceModule.marketCap / 1000000, 0) : "n.a."
    instance.marketState = (company.data.priceModule?.marketState) ? company.data.priceModule.marketState : "n.a."
    instance.postMarketPrice = (company.data.priceModule?.postMarketPrice) ? company.data.priceModule.postMarketPrice : "n.a."
    instance.preMarketChangePercent = (company.data.priceModule?.preMarketChangePercent) ? company.data.priceModule.preMarketChangePercent : "n.a."
    instance.preMarketPrice = (company.data.priceModule?.preMarketPrice) ? company.data.priceModule.preMarketPrice : "n.a."
    instance.quoteType = (company.data.priceModule?.quoteType) ? company.data.priceModule.quoteType : "n.a."
    instance.regularMarketChangePercent = (company.data.priceModule?.regularMarketChangePercent) ? company.data.priceModule.regularMarketChangePercent : "n.a."
    instance.regularMarketDayHigh = (company.data.priceModule?.regularMarketDayHigh) ? company.data.priceModule.regularMarketDayHigh : "n.a."
    instance.regularMarketDayLow = (company.data.priceModule?.regularMarketDayLow) ? company.data.priceModule.regularMarketDayLow : "n.a."
    instance.regularMarketPreviousClose = (company.data.priceModule?.regularMarketPreviousClose) ? company.data.priceModule.regularMarketPreviousClose : "n.a."
    instance.regularMarketPrice = (company.data.priceModule?.regularMarketPrice) ? company.data.priceModule.regularMarketPrice : "n.a."
    instance.regularMarketTime = (company.data.priceModule?.regularMarketTime) ? company.data.priceModule.regularMarketTime : "n.a."
    instance.regularMarketVolume = (company.data.priceModule?.regularMarketVolume) ? company.data.priceModule.regularMarketVolume : "n.a."
    instance.symbol = (company.data.priceModule?.symbol) ? company.data.priceModule.website : "n.a."
    instance.tradingCurrency = (company.data.priceModule?.tradingCurrency) ? company.data.priceModule.tradingCurrency : "n.a."

    // Data Price Object
    instance.dateMinus1MDate = (company.data.priceObject?.dateMinus1MDate) ? company.data.priceObject.dateMinus1MDate : "n.a."
    instance.dateMinus1MPrice = (company.data.priceObject?.dateMinus1MPrice) ? company.data.priceObject.dateMinus1MPrice : "n.a."
    instance.dateMinus3MDate = (company.data.priceObject?.dateMinus3MDate) ? company.data.priceObject.dateMinus3MDate : "n.a."
    instance.dateMinus3MPrice = (company.data.priceObject?.dateMinus3MPrice) ? company.data.priceObject.dateMinus3MPrice : "n.a."
    instance.dateMinus6MDate = (company.data.priceObject?.dateMinus6MDate) ? company.data.priceObject.dateMinus6MDate : "n.a."
    instance.dateMinus6MPrice = (company.data.priceObject?.dateMinus6MPrice) ? company.data.priceObject.dateMinus6MPrice : "n.a."
    instance.dateMinus7DDate = (company.data.priceObject?.dateMinus7DDate) ? company.data.priceObject.dateMinus7DDate : "n.a."
    instance.dateMinus7DPrice = (company.data.priceObject?.dateMinus7DPrice) ? company.data.priceObject.dateMinus7DPrice : "n.a."
    instance.dateMinus12MDate = (company.data.priceObject?.dateMinus12MDate) ? company.data.priceObject.dateMinus12MDate : "n.a."
    instance.dateMinus12MPrice = (company.data.priceObject?.dateMinus12MPrice) ? company.data.priceObject.dateMinus12MPrice : "n.a."
    instance.dateYTDDate = (company.data.priceObject?.dateYTDDate) ? company.data.priceObject.dateYTDDate : "n.a."
    instance.dateYTDPrice = (company.data.priceObject?.dateYTDPrice) ? company.data.priceObject.dateYTDPrice : "n.a."
    instance.high52Date = (company.data.priceObject?.high52Date) ? company.data.priceObject.high52Date : "n.a."
    instance.high52Price = (company.data.priceObject?.high52Price) ? company.data.priceObject.high52Price : "n.a."
    instance.lastPrice = (company.data.priceObject?.lastPrice) ? company.data.priceObject.lastPrice : "n.a."
    instance.lastPriceDate = (company.data.priceObject?.lastPriceDate) ? company.data.priceObject.lastPriceDate : "n.a."
    instance.low52Date = (company.data.priceObject?.low52Date) ? company.data.priceObject.low52Date : "n.a."
    instance.low52Price = (company.data.priceObject?.low52Price) ? company.data.priceObject.low52Price : "n.a."
    instance.perf1D = (company.data.priceObject?.perf1D) ? company.data.priceObject.perf1D : "n.a."
    instance.perf1M = (company.data.priceObject?.perf1M) ? company.data.priceObject.perf1M : "n.a."
    instance.perf1W = (company.data.priceObject?.perf1W) ? company.data.priceObject.perf1W : "n.a."
    instance.perf3M = (company.data.priceObject?.perf3M) ? company.data.priceObject.perf3M : "n.a."
    instance.perf6M = (company.data.priceObject?.perf6M) ? company.data.priceObject.perf6M : "n.a."
    instance.perf12M = (company.data.priceObject?.perf12M) ? company.data.priceObject.perf12M : "n.a."
    instance.perfYTD = (company.data.priceObject?.perfYTD) ? company.data.priceObject.perfYTD : "n.a."
    instance.previousDayDate = (company.data.priceObject?.previousDayDate) ? company.data.priceObject.previousDayDate : "n.a."
    instance.previousDayPrice = (company.data.priceObject?.previousDayPrice) ? company.data.priceObject.previousDayPrice : "n.a."

    // Data Five Year Price Data
    // instance.fiveYearPriceData = (company.data?.fiveYearPriceData) ? company.data.fiveYearPriceData : "n.a."

    return instance
}

function showSectorsAndIndustries() {

    sectors.list = []

    companies.forEach(company => {
        let targetSector = company.sector
        let ind = -1
        for (q = 0; q < sectors.list.length; q++) {
            if (sectors.list[q].name === targetSector) ind = q
        }

        if (ind === -1) {
            let sector = {}
            sector.mc = 0
            sector.noOfCompanies = 0
            sector.name = company.sector
            if (company.marketCap != "n.a.") {
                sector.mc += company.marketCap
            }
            sector.noOfCompanies++
            sector.listOfCompaniesObjects = []
            sector.listOfCompaniesObjects.push(company)
            sector.listOfIndustriesObjects = [] // first with string arrays

            let industry = {}
            industry.name = company.industry

            if (company.marketCap != "n.a.") {
                industry.mc = company.marketCap
            }

            industry.noOfCompanies = 1
            industry.listOfCompaniesObjects = [company]
            sector.listOfIndustriesObjects.push(industry)

            sectors.list.push(sector)
        } else {
            if (company.marketCap != "n.a.") {
                sectors.list[ind].mc += company.marketCap
            }
            sectors.list[ind].noOfCompanies++
            sectors.list[ind].listOfCompaniesObjects.push(company)

            let pointer = -1

            for (q = 0; q < sectors.list[ind].listOfIndustriesObjects.length; q++) {

                if (sectors.list[ind].listOfIndustriesObjects[q].name === company.industry) pointer = q
            }

            if (pointer === -1) {
                let industry = {}
                industry.name = company.industry
                industry.noOfCompanies = 1
                industry.mc = company.marketCap
                industry.listOfCompaniesObjects = []
                industry.listOfCompaniesObjects.push(company)
                sectors.list[ind].listOfIndustriesObjects.push(industry)
            } else {

                if (company.mc != "n.a.") sectors.list[ind].listOfIndustriesObjects[pointer].mc += company.marketCap
                sectors.list[ind].listOfIndustriesObjects[pointer].noOfCompanies++
                sectors.list[ind].listOfIndustriesObjects[pointer].listOfCompaniesObjects.push(company)
            }
        }
    })

    sectors.list.sort(function (a, b) {
        return b.mc - a.mc
    })

    sectors.list.forEach(sector => {
        sector.listOfIndustriesObjects.sort(function (a, b) {
            return b.mc - a.mc
        })
    })



    console.log(sectors)

    sectors.list.forEach(sector => {
        let row = document.createElement('tr')
        row.classList.add('sector')
        // Sector name
        let td = document.createElement('td')
        td.innerHTML = sector.name
        let classNameSector = ""
        if (sector.name != "n.a.") {
            classNameSector = sector.name.replace(" ", "_")
        } else {
            classNameSector = "na"
        }
        row.classList.add(classNameSector)
        row.appendChild(td)
        // Placeholder for industry
        td = document.createElement('td')
        td.innerHTML = ""
        row.appendChild(td)
        // MC
        td = document.createElement('td')
        if (typeof sector.mc === "number") td.innerHTML = goodNumber(sector.mc)
        td.classList.add('right')
        row.appendChild(td)
        // No of companies
        td = document.createElement('td')
        td.innerHTML = sector.noOfCompanies
        td.classList.add('right')
        row.appendChild(td)
        // Open button
        td = document.createElement('td')
        let button = document.createElement('button')
        button.innerText = 'Open'
        button.addEventListener('click', handleOpenSectorClick)
        td.appendChild(button)
        row.appendChild(td)
        // View button
        td = document.createElement('td')
        button = document.createElement('button')
        button.innerText = 'View'
        button.addEventListener('click', handleViewSectorClick)
        td.appendChild(button)
        row.appendChild(td)
        document.querySelector('.sectors-left-table').appendChild(row)
    })
    makeIndustries(sectors)
}

function makeIndustries(sectors) {
    let root = document.querySelector('.industries')

    sectors.list.forEach(sector => {

        let sectorEl = document.createElement('div')
        sectorEl.classList.add(sector.name.replace(" ", "_"))

        const sectorTemplate = document.querySelector('#sector-template').content;
        const sectorElement = sectorTemplate.querySelector('.sector-second').cloneNode(true)

        sectorElement.querySelector('.sector-name').textContent = sector.name
        sectorElement.querySelector('.sector-mc').textContent = ("$ " + goodNumber(Math.round(sector.mc / 1000)) + " bn").replace(".undefined", "")
        sectorElement.querySelector('.sector-companies-count').textContent = sector.noOfCompanies
        sectorElement.querySelector('.sector-industry-holder').classList.add('hidden')
        sectorElement.querySelector('.sector-open-close').addEventListener('click', sectorOpenClose)

        sector.listOfIndustriesObjects.forEach(industry => {
            let industryTemplate = document.querySelector('#industry-template').content;
            let industryElement = industryTemplate.querySelector('.industry').cloneNode(true);
            industryElement.querySelector('.industry-name').textContent = industry.name
            industryElement.querySelector('.industry-mc').textContent = "USD " + goodNumber(Math.round(industry.mc / 1000000000)) + " bn"
            industryElement.querySelector('.industry-companies-count').textContent = industry.noOfCompanies
            industryElement.querySelector('.industry-view-button').addEventListener('click', viewIndustryOnTheRight)
            sectorElement.querySelector('.sector-industry-holder').appendChild(industryElement)
        })

        root.appendChild(sectorElement)
    })
}

function viewIndustryOnTheRight(evt) {
    let targetSector = evt.target.closest('.sector-second').querySelector('.sector-name').innerText
    let targetIndustry = evt.target.closest('.industry').querySelector('.industry-name').innerText
    console.log(targetSector)
    console.log(targetIndustry)
    handleViewIndustry(targetSector, targetIndustry)
}

function sectorOpenClose(evt) {
    console.log('sector-open-close')
    let target = evt.target.closest('.sector-second').querySelector('.sector-industry-holder')
    if (target.classList.contains('hidden')) {
        target.classList.remove('hidden')
        evt.target.closest('.sector-second').querySelector('.sector-open-close').innerHTML = "Close"
    } else {
        target.classList.add('hidden')
        evt.target.closest('.sector-second').querySelector('.sector-open-close').innerHTML = "Open"
    }

}

function handleOpenSectorClick(evt) {
    console.log('handleOpenSectorClick')
    console.log(evt.target.closest('.sector'))
}

function handleViewSectorClick(evt) {
    console.log('handleViewSectorClick')
    // console.log(evt.target.closest('.sector'))

    let targetSector = evt.target.closest('.sector').classList[1].replace("_", " ")
    console.log(targetSector)
    document.querySelector('.sector-or-industry').textContent = targetSector

    if (targetSector === 'na') targetSector = "n.a."
    let sectorObject = sectors.list.find((sector) => { return sector.name === targetSector })
    console.log(sectorObject)
    rightTableObject = []

    for (q = 0; q < sectorObject.listOfCompaniesObjects.length; q++) {
        let instance = {}
        instance.ticker = sectorObject.listOfCompaniesObjects[q].ticker
        instance.longName = sectorObject.listOfCompaniesObjects[q].longName
        instance.mc = sectorObject.listOfCompaniesObjects[q].marketCap
        instance.lastPrice = sectorObject.listOfCompaniesObjects[q].lastPrice
        instance.perf12M = sectorObject.listOfCompaniesObjects[q].perf12M
        instance.perfYTD = sectorObject.listOfCompaniesObjects[q].perfYTD
        instance.perf6M = sectorObject.listOfCompaniesObjects[q].perf6M
        instance.perf3M = sectorObject.listOfCompaniesObjects[q].perf3M
        instance.perf1M = sectorObject.listOfCompaniesObjects[q].perf1M
        instance.perf1W = sectorObject.listOfCompaniesObjects[q].perf1W
        instance.perf1D = sectorObject.listOfCompaniesObjects[q].perf1D
        rightTableObject.push(instance)
    }

    makeRightTable(rightTableObject)

}

function handleViewIndustry(sectorName, industryName) {
    console.log('handleViewSector')
    console.log('------------')
    console.log(sectorName)
    console.log('------------')


    let sectorObject = sectors.list.find((sector) => { return sector.name === sectorName })
    console.log(sectorObject)

    let industryObject = sectorObject.listOfIndustriesObjects.find((industry) => { return industry.name === industryName })

    rightTableObject = []

    for (q = 0; q < industryObject.listOfCompaniesObjects.length; q++) {
        let instance = {}
        instance.ticker = industryObject.listOfCompaniesObjects[q].ticker
        instance.longName = industryObject.listOfCompaniesObjects[q].longName
        instance.mc = industryObject.listOfCompaniesObjects[q].marketCap
        instance.lastPrice = industryObject.listOfCompaniesObjects[q].lastPrice
        instance.perf12M = industryObject.listOfCompaniesObjects[q].perf12M
        instance.perfYTD = industryObject.listOfCompaniesObjects[q].perfYTD
        instance.perf6M = industryObject.listOfCompaniesObjects[q].perf6M
        instance.perf3M = industryObject.listOfCompaniesObjects[q].perf3M
        instance.perf1M = industryObject.listOfCompaniesObjects[q].perf1M
        instance.perf1W = industryObject.listOfCompaniesObjects[q].perf1W
        instance.perf1D = industryObject.listOfCompaniesObjects[q].perf1D
        rightTableObject.push(instance)
    }
    makeRightTable(rightTableObject)
}

function handleTickerClick(evt) {
    let targetTicker = evt.target.innerText
    console.log(targetTicker)
    localStorage.ticker = targetTicker
    window.location.assign('getOneTicker.html')
}

function makeRightTable(rightTableObject) {

    let toDelete = document.querySelectorAll('.company-row')
    if (toDelete) Array.from(toDelete).forEach(row => row.remove())
    rightTableObject.forEach(company => {

        let row = document.createElement('tr')
        row.classList.add("company-row")
        // ticker
        let td = document.createElement('td')
        td.classList.add('left')
        td.classList.add('.ticker')
        td.addEventListener('click', handleTickerClick)
        if (company.ticker) td.innerHTML = company.ticker
        row.appendChild(td)
        // company name
        td = document.createElement('td')
        td.classList.add('left')
        if (company.longName) td.innerHTML = company.longName
        row.appendChild(td)
        // mc
        td = document.createElement('td')
        td.classList.add('right')
        if (company.mc) td.innerHTML = goodNumber(company.mc)
        row.appendChild(td)
        // last price
        td = document.createElement('td')
        td.classList.add('right')
        if (company.lastPrice) td.innerHTML = company.lastPrice.toFixed(2)
        row.appendChild(td)
        // perf 12M
        td = document.createElement('td')
        td.classList.add('right')
        if (company.perf12M) td.innerHTML = company.perf12M
        td.classList.add(redOrGreen(company.perf12M))
        row.appendChild(td)
        // perf ytd
        td = document.createElement('td')
        td.classList.add('right')
        if (company.perfYTD) td.innerHTML = company.perfYTD
        td.classList.add(redOrGreen(company.perfYTD))
        row.appendChild(td)
        // perf 6M
        td = document.createElement('td')
        td.classList.add('right')
        if (company.perf6M) td.innerHTML = company.perf6M
        td.classList.add(redOrGreen(company.perf6M))
        row.appendChild(td)
        // perf 3M
        td = document.createElement('td')
        td.classList.add('right')
        if (company.perf3M) td.innerHTML = company.perf3M
        td.classList.add(redOrGreen(company.perf3M))
        row.appendChild(td)
        // perf 1M
        td = document.createElement('td')
        td.classList.add('right')
        if (company.perf1M) td.innerHTML = company.perf1M
        td.classList.add(redOrGreen(company.perf1M))
        row.appendChild(td)
        // perf 1W
        td = document.createElement('td')
        td.classList.add('right')
        if (company.perf1W) td.innerHTML = company.perf1W
        td.classList.add(redOrGreen(company.perf1W))
        row.appendChild(td)
        // perf 1D
        td = document.createElement('td')
        td.classList.add('right')
        if (company.perf1D) td.innerHTML = company.perf1D
        td.classList.add(redOrGreen(company.perf1D))
        row.appendChild(td)

        document.querySelector('.right-performance-table').appendChild(row)
    })
}

function companyObjectSort(evt) {
    console.log(evt.target.innerHTML)
    let service = evt.target.innerHTML
    console.log(rightTableObject)
    switch (service) {
        case "By MC":
            rightTableObject.sort(function (a, b) {
                return b.mc - a.mc
            })
            break;
        case "1Y":
            rightTableObject.sort(function (a, b) {
                return parseFloat(b.perf12M) - parseFloat(a.perf12M)
            })
            break;
        case "YTD":
            rightTableObject.sort(function (a, b) {
                return parseFloat(b.perfYTD) - parseFloat(a.perfYTD)
            })
            break;
        case "6M":
            rightTableObject.sort(function (a, b) {
                return parseFloat(b.perf6M) - parseFloat(a.perf6M)
            })
            break;

        case "3M":
            rightTableObject.sort(function (a, b) {
                return parseFloat(b.perf3M) - parseFloat(a.perf3M)
            })
            break;
        case "1M":
            rightTableObject.sort(function (a, b) {
                return parseFloat(b.perf1M) - parseFloat(a.perf1M)
            })
            break;
        case "1W":
            rightTableObject.sort(function (a, b) {
                return parseFloat(b.perf1W) - parseFloat(a.perf1W)
            })
            break;
        case "1D":
            rightTableObject.sort(function (a, b) {
                return parseFloat(b.perf1D) - parseFloat(a.perf1D)
            })

            break;
    }
    makeRightTable(rightTableObject)
}

function redOrGreen(line) {
    if (line[0] === "-") {
        return 'red'
    } else {
        return 'green'
    }
}

function goodNumber(num, factor = 'none') {


    let arr = (num + "").split('.')

    num = parseInt(arr[0])



    switch (factor) {
        case 'none':
            num = num
            break;
        case 'mn':
            num = Math.round(num / 1000000)
            break;
        case 'bn':
            num = Math.round(num / 1000000000)
            break;
    }
    num = num.toFixed(0).toString()

    if (num.length < 4) {
        return num + "." + arr[1]
    }



    switch (num.length) {
        case 4:
            num = num.substring(0, 1) + " " + num.substring(1, 4)
            break;
        case 5:
            num = num.substring(0, 2) + " " + num.substring(2, 5)
            break;
        case 6:
            num = num.substring(0, 3) + " " + num.substring(3, 6)
            break;
        case 7:
            num = num.substring(0, 1) + " " + num.substring(1, 4) + " " + num.substring(4, 7)
            break;
        case 8:
            num = num.substring(0, 2) + " " + num.substring(2, 5) + " " + num.substring(5, 8)
            break;
        case 9:
            num = num.substring(0, 3) + " " + num.substring(3, 6) + " " + num.substring(6, 9)
            break;
        case 10:
            num = num.substring(0, 1) + " " + num.substring(1, 4) + " " + num.substring(4, 7) + " " +
                num
                    .substring(7, 10)
            break;
        case 11:
            num = num.substring(0, 2) + " " + num.substring(2, 5) + " " + num.substring(5, 8) + " " +
                num
                    .substring(8, 11)
            break;
        case 12:
            num = num.substring(0, 3) + " " + num.substring(3, 6) + " " + num.substring(6, 9) + " " +
                num
                    .substring(9, 12)
            break;
        case 13:
            num = num.substring(0, 1) + " " + num.substring(1, 4) + " " + num.substring(4, 7) + " " +
                num
                    .substring(7, 10) + " " + num.substring(10, 13)
            break;
        case 14:
            num = num.substring(0, 2) + " " + num.substring(2, 5) + " " + num.substring(5, 8) + " " +
                num
                    .substring(8, 11) + " " + num.substring(11, 14)
            break;
        case 15:
            num = num.substring(0, 3) + " " + num.substring(3, 6) + " " + num.substring(6, 9) + " " +
                num
                    .substring(9, 12) + " " + num.substring(12, 15)
            break;
        default:
            num = num
            break;
    }
    return num
}

// DICTIONARY
/*



country:
date:
dateMinus1MDate:
dateMinus1MPrice:
dateMinus3MDate:
dateMinus3MPrice:
dateMinus6MDate:
dateMinus6MPrice:
dateMinus7DDate:
dateMinus7DPrice:
dateMinus12MDate:
dateMinus12MPrice:
dateYTDDate:
dateYTDPrice:
earningsAverage:
earningsDate:
earningsHigh:
earningsLow:
fiveYearPriceData:
fullTimeEmployees:
high52Date:
high52Price:
id:
lastPrice:
lastPriceDate:
longBusinessSummary:
longName:
low52Date:
low52Price:
marketCap:
marketState:
perf1M:
perf1W:
perf3M:
perf6M:
perf12M:
perfYTD:
perf1D:
postMarketPrice:
preMarketChangePercent:
preMarketPrice:
previousDayDate:
previousDayPrice:
quoteType:
regularMarketChangePercent:
regularMarketDayHigh:
regularMarketDayLow:
regularMarketPreviousClose:
regularMarketPrice:
regularMarketTime:
regularMarketVolume:
revenueAverage:
revenueHigh:
revenueLow:
sector:
symbol:
ticker:
tradingCurrency:
website:

*/ 