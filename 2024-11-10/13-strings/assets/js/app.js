const massage = 'hello world';
console.log(massage)

console.log(massage[0])

massage[0] = '1';
console.log(massage)
console.log(massage.toUpperCase())

const toUpperCase= ' HI, HOW ARE YOU'
console.log(massage.toUpperCase)


const text = 'hello world'
console.log(text.includes('hello'))

const imp= 'yossi,yaniv,gui'
//spliting the string like php impload into an aray
impArray = imp.split(',')
console.log(impArray)
for (let i = 0; i < impArray.length; i++) {
    console.log(impArray[i])
}


const longMassage = 'lorem ipsum jamaica sit amet consectetur adipisicing elit. Quisquam, quos.'
console.log(longMassage.slice(15, 20))
// console.log(longMassage.slice(10, 20))