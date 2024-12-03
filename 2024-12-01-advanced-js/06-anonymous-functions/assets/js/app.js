const power2 = (num) => { return num ** 2 }






const printPower2 = (num, powerFunc) => {  console.log(powerFunc(num)) }
// printPower2(3, power2)

// now inline function 

printPower2(3, (num) => { return num ** 2 })


const sum =(a,b) => {
    const result = a + b 
    console.log(result)
    return result
}

const power4 = num => {
    const result = num ** 4
    console.log(result)
    return result
}