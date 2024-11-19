let multiplicationBoard =[]

const boardSize = 10

for (let i = 1; i <= boardSize; i++) {
let row = []
    for (let j = 1; j <= boardSize; j++) {
row.push(i * j)
    
}    
multiplicationBoard.push(row)
}

let table = "<table class='charty' border='1'>";

for (let i = 0; i < multiplicationBoard.length; i++) {
    table += "<tr>";
    for (let j = 0; j < multiplicationBoard[i].length; j++) {
        table += "<td>" + multiplicationBoard[i][j] + "</td>";
    }
    table += "</tr>";
}

table += "</table>";
document.write(table);