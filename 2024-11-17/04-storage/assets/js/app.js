//
// document.cookie = 'theme=dark'

// console.log(document.cookie)


const expirationDate = new Date()
expirationDate.setFullYear(expirationDate.getFullYear() +1)
document.cookie = `theme=purple; expires=${expirationDate}`
document.write(expirationDate)