const lastName = 'shahar'
const highestGrade = 96

const showGrade = (grade) => {
    console.log(`grade is ${grade}`)
    return true
}

const showName = (name) => {
    console.log(`name is ${name}`)
}


const showFunction = (someFunction) => {
    console.log(`someFunction is ${someFunction}`)
    console.log(`someFunction typeof is ${typeof someFunction}`)

}

showName(lastName)
showGrade(highestGrade)
showFunction(showGrade())