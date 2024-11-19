const phoneNumber = prompt('please enter a phone number')

alert(typeof(phoneNumber))

let isPhoneNumber = true

// document.write(`${phoneNumber} is ${isPhoneNumber ? '' : 'not'} a phone number`)

document.write(phoneNumber.length)

if (phoneNumber.length !== 10) {
    isPhoneNumber = false
} else if(!phoneNumber.startsWith('05')) {
    isPhoneNumber = true
}
// else if(isNaN(+phoneNumber)){
//     isPhoneNumber = false
// }
else{
    for (const num of phoneNumber) {
        if(isNaN(+num)){
            isPhoneNumber = false
            break  
        }
    }
}



console.log(isPhoneNumber)