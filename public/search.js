let market = []
let serverData

getData().then(market => {
    console.log(market)

    market.forEach(sector => {
        createSector(sector.sectorName, sector.sectorMc, sector.sectorCount, sector)
    })
    let sectorOpenCloseBTNs = document.querySelectorAll('.sector-open-close')
    let industryOpenCloseBTNs = document.querySelectorAll('.industry-open-close')
    Array.from(sectorOpenCloseBTNs).forEach(button => button.addEventListener('click', handleSectorOpenClose))
    Array.from(industryOpenCloseBTNs).forEach(button => button.addEventListener('click', handleIndustryOpenClose))
}
)

async function getData() {
    let query = await fetch('http://127.0.0.1:3003/outloader/search')
    let data = await query.json()
    console.log(data)
    serverData = data
    market = []

    data.forEach(company => {


        if (market.filter(item => item.sectorName === company.sector).length > 0) {

            let index = market.findIndex(item => item.sectorName === company.sector)

            market[index].sectorMc += company.mc
            market[index].sectorCount++
            market[index].sectorCompanies.push(company)


            if (market[index].sectorIndustries.filter(item => item.industryName == company.industry).length > 0) {
                let index2 = market[index].sectorIndustries.findIndex(item => item.industryName === company.industry)

                market[index].sectorIndustries[index2].industryMc += company.mc
                market[index].sectorIndustries[index2].industryCount++
                market[index].sectorIndustries[index2].industryCompanies.push(company)


            } else {
                market[index].sectorIndustries.push({
                    industryName: company.industry,
                    industryMc: company.mc,
                    industryCount: 1,
                    industryCompanies: [company]
                })
            }


        } else {
            let sector = {
                sectorName: company.sector,
                sectorMc: company.mc,
                sectorCount: 1,
                sectorCompanies: [company],
                sectorIndustries: [{
                    industryName: company.industry,
                    industryMc: company.mc,
                    industryCount: 1,
                    industryCompanies: [company]
                }]
            }
            market.push(sector)
        }
    });
    // arranging sector instances by mc
    market.sort(function (a, b) {
        return b.sectorMc - a.sectorMc;
    })
    // aarranging companies by mc in each sector
    market.forEach(sector => {
        sector.sectorCompanies.sort(function (a, b) {
            return b.mc - a.mc;
        })
    })
    //arranging indutries by mc in each sector
    market.forEach(sector => {
        sector.sectorIndustries.sort(function (a, b) {
            return b.industryMc - a.industryMc;
        })
    })
    //arranging companies my mc in each industry
    market.forEach(sector => {
        sector.sectorIndustries.forEach(industry => {

            industry.industryCompanies.sort(function (a, b) {
                return b.mc - a.mc;
            })
        })
    })
    return market
}

let rootEl = document.querySelector('main')

function createSector(sectorName, sectorMc, sectorNoOfCompanies, sector) {
    const sectorTemplate = document.querySelector('#sector-template').content;
    const sectorElement = sectorTemplate.querySelector('.sector').cloneNode(true)
    sectorElement.querySelector('.sector-name').textContent = sectorName
    sectorElement.querySelector('.sector-mc').textContent = "USD " + goodNumber(Math.round(sectorMc / 1000000000)) + " bn"
    sectorElement.querySelector('.sector-companies-count').textContent = sectorNoOfCompanies

    sectorElement.querySelector('.sector-industry-holder').classList.add('hidden')
    rootEl.appendChild(sectorElement)


    sector.sectorIndustries.forEach(industry => {

        let industryTemplate = document.querySelector('#industry-template').content;
        let industryElement = industryTemplate.querySelector('.industry').cloneNode(true);
        industryElement.querySelector('.industry-name').textContent = industry.industryName
        industryElement.querySelector('.industry-mc').textContent = "USD " + goodNumber(Math.round(industry.industryMc / 1000000000)) + " bn"
        industryElement.querySelector('.industry-companies-count').textContent = industry.industryCount
        industryElement.querySelector('.industry-companies-holder').classList.add('hidden')
        sectorElement.querySelector('.sector-industry-holder').appendChild(industryElement)

        industry.industryCompanies.forEach(company => {
            let companyTemplate = document.querySelector('#company-template').content;
            let companyElement = companyTemplate.querySelector('.company').cloneNode(true);
            companyElement.querySelector('.go-to-company-page').addEventListener('click', handleTickerPageButton)
            companyElement.querySelector('.company-ticker').textContent = company.ticker
            companyElement.querySelector('.company-ticker').addEventListener('click', showDescription)
            companyElement.querySelector('.company-name').textContent = company.companyName
            companyElement.querySelector('.company-mc').textContent = "USD " + goodNumber(Math.round(company.mc / 1000000000)) + " bn"
            industryElement.querySelector('.industry-companies-holder').classList.add('hidden')
            industryElement.querySelector('.industry-companies-holder').appendChild(companyElement)
        })
    })
}

function handleCloseDescriptionButton(evt) {
    console.log('closing')
    evt.target.closest('.description').remove()
    document.querySelector('main').style.opacity=1
}


function showDescription(evt) {
    console.log(evt.target.textContent)
    console.log(evt.target.textContent.length)
    let targetCompany = serverData.filter(element => element.ticker === evt.target.textContent)[0]

    let descriptionTemplate = document.querySelector('#description-template').content;
    let descriptionElement = descriptionTemplate.querySelector('.description').cloneNode(true);
    descriptionElement.querySelector('.description-ticker').textContent = targetCompany.ticker
    descriptionElement.querySelector('.description-name').textContent = targetCompany.companyName
    descriptionElement.querySelector('.description-mc').textContent =  "USD " + goodNumber(Math.round(targetCompany.mc / 1000000000)) + " bn"

document.querySelector('main').style.opacity=0.3
   

    descriptionElement.querySelector('.description-description').textContent = targetCompany.description
    descriptionElement.querySelector('.description-close-button').addEventListener('click', handleCloseDescriptionButton)
    descriptionElement.style.top = evt.clientY + "px"
    descriptionElement.style.left = evt.clientX + "px"
    document.body.appendChild(descriptionElement)

    console.log(targetCompany)
    console.log(evt.clientX)
    console.log(evt.clientY)
}

function handleSectorOpenClose(evt) {
    console.log(evt.target)

    let root = evt.target.closest('.sector')
    let rootIndustryHolder = root.querySelector('.sector-industry-holder')

    if (rootIndustryHolder.classList.contains('hidden')) {
        rootIndustryHolder.classList.remove('hidden')
        rootIndustryHolder.classList.add('show')
        evt.target.textContent = "Close"
    } else {
        rootIndustryHolder.classList.remove('show')
        rootIndustryHolder.classList.add('hidden')
        evt.target.textContent = "Open"
    }
}

function handleIndustryOpenClose(evt) {
    console.log(evt.target)

    let root = evt.target.closest('.industry')
    let rootIndustryHolder = root.querySelector('.industry-companies-holder')
    console.log(rootIndustryHolder)
    if (rootIndustryHolder.classList.contains('hidden')) {
        rootIndustryHolder.classList.remove('hidden')
        rootIndustryHolder.classList.add('show')
        evt.target.textContent = "Close"
    } else {
        rootIndustryHolder.classList.remove('show')
        rootIndustryHolder.classList.add('hidden')
        evt.target.textContent = "Open"
    }
}


function goodNumber(num, factor = 'none') {
    num = parseInt(num)
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
        return num
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


function handleTickerPageButton(evt) {
    let ticker = (evt.target.closest('.company-heading')).querySelector('.company-ticker').textContent
    console.log(ticker)
}