const getRandomBetwean0And100 = () => Math.floor(Math.random()*101)

const getRandomPoint = () => ({x: getRandomBetwean0And100(),y: getRandomBetwean0And100()})


const points = []  

for (let i = 0; i < 20; i++) {
    points.push(getRandomPoint())
}
console.log(point)
console.log(`all the points`)
points.forEach(point => console.log(point))


console.log(`first point that y bigger then x`)
console.log(points.find(point => point.x > point.y))


console.log(`all points where y is even`)
console.log(points.filter(point.y % 2 == 0))

console.log(`all points where x is odd`)
console.log(points.filter(point.x % 2 !== 0))


console.log(`all points where x bigger then 50`)
console.log(points.filter(point.x > 50))

console.log(`index of first point where x bigger then 50 `)
console.log(points.find(point.x > 50))

points
.map(point => Math.sqrt(point.x **2 + point.y **2))
.forEach()

console.log(`minimal x`)
console.log(points.reduce((minimum,currebt) => current.x < minimum ? current.x : minimum,Infinity))