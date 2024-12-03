const power2 = (num) => {
    return num ** 2
} 

const power2Extended = (num) => {
    console.log(num ** 2)
    return num ** 2
}


// a function that is send as an argument to another function
// is called a callback function
//why?
// because the function that is passed as an argument is called
// by the function that receives it as an argument



const printPower2 = (num , powerFunc) => {
    console.log(powerFunc(num))
}

printPower2(3, power2Extended)