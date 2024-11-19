//samsung products array
let products = [
{
    id: 1,
    name: "Galaxy S21",
    price: 1000
},
{
    id: 2,
    name: "Galaxy S20",
    price: 800
},
{
    id: 3,
    name: "Galaxy S10",
    price: 600
},
{
    id: 4,
    name: "Galaxy S9",
    price: 400
},
{
    id: 5,
    name: "Galaxy S8",
    price: 200
},
{
    id: 6,
    name: "Galaxy S7",
    price: 100
},
{
    id: 7,
    name: "Galaxy S6",
    price: 50
},
{
    id: 8,
    name: "Galaxy S5",
    price: 10
},
{
    id: 9,
    name: "Galaxy S4",
    price: 5
},
{
    id: 10,
    name: "Galaxy S3",
    price: 1
}
]


localStorage.setItem('products', JSON.stringify(products))
const info =JSON.parse(localStorage.getItem('products'))

console.log(info[2])