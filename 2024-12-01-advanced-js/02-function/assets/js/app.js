const lastName = 'shahar'
const highestGrade = 96

const showGrade = (grade) => {
    console.log(`grade is ${grade}`)
}

const showName = (name) => {
    console.log(`name is ${name}`)
}


const showFunction = (someFunction) => {
    console.log(`some function is ${someFunction}`)
}

showName(lastName)
showGrade(highestGrade)
showFunction(showGrade)