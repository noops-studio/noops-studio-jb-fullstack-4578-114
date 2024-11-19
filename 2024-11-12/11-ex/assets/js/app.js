// let isPositive = false;
function ablsulutNum(num){
 return num > 0 ? num : num * -1
}
let number = -4
console.log(`num ${number} is a ${ablsulutNum(number)}`)

numbers1 = [-4]
numbers1.forEach(number => {
  console.log(`num ${number} is a ${absoluteNum(number)}`);
});