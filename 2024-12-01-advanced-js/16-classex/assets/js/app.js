const students = [
    {
        name: 'Yoav',
        grade: 95,
        age: 22
    },
    {
        name: 'Beery',
        grade: 96,
        age: 18
    },
    {
        name: 'Itay',
        grade: 65,
        age: 25
    }
]
let highestGrade = 0
students.forEach(student => {
    if (student.grade > highestGrade) {
        highestGrade = student.grade
    }
})
console.log(highestGrade)
const highestGrade2 = students.reduce((acc, student) => student.grade > acc ? student.grade : acc, 0)
console.log(highestGrade2)