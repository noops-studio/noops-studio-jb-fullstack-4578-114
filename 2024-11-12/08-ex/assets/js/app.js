function generateCub(row, col) {
    function tow(n) {
        return '*'.repeat(n);
    }

    let cub = '';
    for (let i = 0; i < col; i++) {
        cub += tow(row) + '\n';
    }
    return cub;
}

const row = 100;
const col = 100;
const cub = generateCub(row, col);

document.write(`<pre>${cub}</pre>`);


const array1 = [12,14,12,15,87]
const array2 = [15,87,12,14,98]

function maxnum(arr){

for (const num of arr) {

    return Math.max(...arr)
}
}
console.log(maxnum(array1));
console.log(maxnum(array2));
