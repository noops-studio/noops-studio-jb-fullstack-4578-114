const work = () => {
console.log(`hello1`)
const numberOfDigits = +prompt(`enter number of digits`)


try {
    const pi = Math.PI.toFixed(numberOfDigits)

    console.log(pi)
} catch (e) {
console.log(e)
alert(`please enter a number bitwean 0 and 100`)
}finally{
    console.log(`dealth with error`)
}
console.log(`hello2`)

}
work()