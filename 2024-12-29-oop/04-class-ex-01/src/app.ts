import Mobile from "./mobile.js";

// const samsung = new Mobile
// samsung.type = 'Samsung Galaxy S21'
// samsung.screenSize = 6.2
// samsung.price = 999
// samsung.numberOfCamera = 3
const samsung = new Mobile('Samsung Galaxy S21', 6.2, 999, 3)

document.getElementById('samsungTakePicture').addEventListener('click', () => {
    samsung.takePicture()
}
)
document.getElementById('samsungTurnOn').addEventListener('click', () => {
    samsung.turnOn()
}
)
document.getElementById('samsungTurnOff').addEventListener('click', () => {
    samsung.turnOff()
}
)
document.getElementById('samsunggetPincode').addEventListener('click', () => {
    samsung.getPincode()
}

// const iphone = new Mobile
// iphone.type = 'iPhone 12 Pro'
// iphone.screenSize = 6.1
// iphone.price = 1099
// iphone.numberOfCamera = 3
const iphone = new Mobile('iPhone 12 Pro', 6.1, 1099, 3)

document.getElementById('iphoneTakePicture').addEventListener('click', () => {
    iphone.takePicture()
}
)
document.getElementById('iphoneTurnOn').addEventListener('click', () => {
    iphone.turnOn()
}
)
document.getElementById('iphoneTurnOff').addEventListener('click', () => {
    iphone.turnOff()
}
)

document.getElementById('iphonegetPincode').addEventListener('click', () => {
    iphone.getPincode()
}
)