
console.log('description script')

let descriptionText = document.querySelector('.descriptionText')

function buildDescriptionTable(obj) {    
    descriptionText.textContent = obj.data.assetProfile.longBusinessSummary
}

function clearDescriptionTable() {
    descriptionText.textContent = ""
}


