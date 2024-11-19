const products = [
    ["Onion", "Carrot", "Tomato", "Cucumber"],
    ["Apple", "Banana", "Peach", "Grapes", "Orange"],
    ["Wheat", "Flour"]
]


// for (let i = 0; i < products.length; i++) {
//     for (let j = 0; j < products[i].length; j++) {
//         document.write(`"${products[i][j]}"`)

//     }
// }

let arr = []

for (const row of products) {
    for (const cell of row) {
        arr.push(cell)
    }
}

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        document.write(`"${arr[i][j]}"`)

    }
}
