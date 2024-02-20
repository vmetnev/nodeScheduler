
// do function create sector

// do function add industry to sector

// do function add company to industry

// do ticker page

let rootEl = document.querySelector('main')


function createSector(sectorName, sectorMc,sectorNoOfCompanies){
    const sectorTemplate = document.querySelector('#sector-template').content;
    const sectorElement = sectorTemplate.querySelector('.sector').cloneNode(true)    
    sectorElement.querySelector('.sector-industry-holder').classList.add('hidden')
    


    rootElappend(sectorElement)
}



let industryTemplate = document.querySelector('#industry-template').content;
let industryElement = industryTemplate.querySelector('.industry').cloneNode(true);
industryElement.querySelector('.industry-companies-holder').classList.add('hidden')
document.querySelector('.sector-industry-holder').appendChild(industryElement)


let companyTemplate = document.querySelector('#company-template').content;
let companyElement = companyTemplate.querySelector('.company').cloneNode(true);
document.querySelector('.industry-companies-holder').appendChild(companyElement)


industryTemplate = document.querySelector('#industry-template').content;
industryElement = industryTemplate.querySelector('.industry').cloneNode(true);
industryElement.querySelector('.industry-companies-holder').classList.add('hidden')
document.querySelector('.sector-industry-holder').appendChild(industryElement)





let sectorOpenCloseBTNs = document.querySelectorAll('.sector-open-close')


Array.from(sectorOpenCloseBTNs).forEach(button => button.addEventListener('click', handleSectorOpenClose))

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

let industryOpenCloseBTNs = document.querySelectorAll('.industry-open-close')
Array.from(industryOpenCloseBTNs).forEach(button => button.addEventListener('click', handleIndustryOpenClose))


function handleIndustryOpenClose(evt) {
    console.log(evt.target)

    let root = evt.target.closest('.industry')
    let rootIndustryHolder = root.querySelector('.industry-companies-holder')

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

document.querySelector('.sector').setAttribute('sectorname', 'technology  - ee')