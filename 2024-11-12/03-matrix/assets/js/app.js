const matrix = [
    [1, 2, 3],
    [13, 15, 17],
    [40, 60, 80],
    [41, 60, 80]

]

document.write(matrix[1][2])
document.write("<hr>")

document.write(matrix[2][1])
document.write("<hr>")

for (const row of matrix) {
    for (const cell of row) {
        document.write(`${cell} | `)
    }
    document.write('<br>')
}


let sum = 0;
let count = 0;
for (const row of matrix) {
    for (const cell of row) {
        sum += cell
        count +=1
    }
}
avg = sum / count
document.write(`sum of matrix is ${avg}`)
