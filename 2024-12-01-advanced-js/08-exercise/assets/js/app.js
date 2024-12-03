function sayHello() {
    console.log(`hello`)
}


doSomthing(sayHello)

function doSomthing(callback) {
    callback()
}

// inline function
// anonymous function
// arrow function

// 1. inline function
doSomthing(function () {
    console.log(`hello`)
})

// 2. anonymous function
doSomthing(function () {
    console.log(`hello`)
})

// 3. arrow function
doSomthing(() => {
    console.log(`hello`)
})


// exercise 1 - several arguments , single command

function sum(a, b, c) {
    console.log(a + b + c)

}

function dosum(callback) {
    callback(10, 20, 30)
}

dosum(function sum(a, b, c) {
    console.log(a + b + c)
})

dosum(function (a, b, c) {
    console.log(a + b + c)
})

dosum((a, b, c) => {console.log(a + b + c)})

function getPower2(num){
    return num ** 2
}

function printPower2(callback){
    console.log(callback(20))
}

printPower2(getPower2)

printPower2(function getPower2(num){return num ** 2})

printPower2(function(num){return num ** 2})

printPower2( (num) =>{return num ** 2})
/*
    1. getPower2
    2. printPower2
    3. callback
    4. 20
    5. 400
function divide(a,b){
    const result = a / b
    return result
}

function printIsEven(num){
    if(num % 2 === 0){
        console.log('odd')
    }else{
        console.log('even')
    }
}

function isNegative(num){
    if(num < 0){
        return true
    }else{
        return false
    }
}

*/

const divide = (a,b) => {
    return result = a / b
}

const printIsEven = (num) => {
    if(num % 2 === 0){
        console.log('odd')
    }else{
        console.log('even')
    }
}


const isNegative = (num) => {
    if(num < 0){
        return true
    }else{
        return false
    }
}