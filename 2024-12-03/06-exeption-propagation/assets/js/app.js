const fixNum = ( num , numberOfDigits) => num.toFixed(numberOfDigits)
const work = () => {
    const numberOfDigits = +prompt(`enter number of digits`)
    console.log(`hello1`)
    const pi = fixNum(Math.PI ,numberOfDigits)
console.log(pi)
}
work()

try {
    work()
} catch (e) {
 console.log(e)   
}
console.log(`hello2`)