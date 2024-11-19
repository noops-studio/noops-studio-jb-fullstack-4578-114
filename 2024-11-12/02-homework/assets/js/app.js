const websiteAddress = prompt('enter a website address')

const indexOfFirstDot =websiteAddress.indexOf('.')
const suffix = websiteAddress.substring(indexOfFirstDot)
document.write(suffix)