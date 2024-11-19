const matrix = [];

for (let rowCount = 0; rowCount < 5; rowCount++) {
    const row = []
    for (let colCount = 0; colCount < 5; colCount++) {
        const randomNumber = parseInt(Math.random() * (100 - 20)) + 20
        row.push(randomNumber)
    }
    matrix.push(row)
}

console.log(matrix)

let max = 0;

for (const row of matrix) {
    for (const cell of row) {
        max = cell > max ? cell : max
    }
}
console.log(max)


let maxRow = 0;
let maxCol = 0;
max =0;
for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] > max) {
            max = matrix[row][col]
            maxRow = row
            maxCol = col

        }
    }
}
console.log(`max value os ${max} and the index is located at  [${maxRow}][${maxCol}]`)

const maxi ={
    row:0,
    col:0,
    value:0
}
max =0
for ( maxi.row = 0; maxi.row < matrix.length; maxi.row++) {
    for (maxi.col = 0; maxi.col < matrix[maxi.row].length; maxi.col++) {
        if (matrix[maxi.row][maxi.col] > max) {
            max = matrix[maxi.row][maxi.col]
            maxRow = maxi.row
            maxCol = maxi.col

        }
    }
}
console.log(`maxi max value os ${max} and the index is located at  [${maxRow}][${maxCol}]`)