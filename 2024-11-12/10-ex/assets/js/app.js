// let isPositive = false;
function getPositive(num){
    let isPositive = 'negative number';
    if (num > 0){
         isPositive = 'positive number';
    }
    return isPositive
}

console.log(`num 2 is a ${getPositive(2)}`)