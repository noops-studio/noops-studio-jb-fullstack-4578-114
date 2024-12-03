const getRandom = (min,max) => Math.floor(Math.random() * (max - min + 1)) + min

const generatepizzas = () => ({
    diameter: getRandom(20,50),
    slices: getRandom(4,12),
    toppings: getRandom(0,5),
    price: getRandom(5,20)
})


const pizzas = []

for (let i = 0; i < 20; i++) {
    pizzas.push(generatepizzas())
}

console.log(pizzas)

console.log(pizzas.map(({diameter slices ,price}) => ({
diameter,
slices ,
toppings,
price,
vat: pizza.price * 0.17
})))    
