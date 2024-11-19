const matrix = [[12, 23, 34, 45], [56, 67, 78, 89], [10, 20, 30, 40]];
//now we will echo the entire matrix into document write and do <br> for each row
for (let i = 0; i < matrix.length; i++) {
    document.write(matrix[i] + "<br>");
}
//sum of all the values for each row
let sum = 0;

for (let i = 0; i < matrix.length; i++) {
    // sum += matrix[0][i]
    for (let j = 0; j < matrix.length; j++) {
        sum += matrix[i][j]
        // console.log(`corrent iretation is i = ${i} and j is ${j}`)
        // console.log(`corrent matrix is ${matrix[i][j]}`)
    }

}
document.write(`the total of all the values in the matrix is ${sum} <br> `)

//avg of matrix 
let sum2 = 0
let count = 0
for (const row of matrix) {
    for (const cell of row) {
        sum2 += cell
        count += 1
    }

}

document.write(` the avg of the matrix values are ${sum2 / count} <br>`)


// here we will convert the matrix  into a 1 d array
let arr = []
for (const row of matrix) {
    for (const cell of row) {
        arr.push(cell)
    }
}

document.write(`the max value in the matrix is ${Math.max(...arr)} <br>`)


// matrix emojis 
const emoji = '😊'

for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] % 7 !== 0)
            matrix[i][j] = emoji
    }
}
for (let i = 0; i < matrix.length; i++) {
    document.write(matrix[i] + "<br>");
}