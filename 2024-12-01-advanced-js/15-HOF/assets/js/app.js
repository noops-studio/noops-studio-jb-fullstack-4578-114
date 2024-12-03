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

// find item
for (const student of students) {
    if (student.grade === 65) {
        console.log(student)
        break
    }
}

const student = students.find(student => student.grade === 65)
console.log(student)

// filter items
const studentsWith90Plus =[]
for (const student of students) {
    if (student.grade > 90 && student.name.startsWith('B')) {
        studentsWith90Plus.push(student)
        break
    }
}
console.log(studentsWith90Plus)
const filteredStudents = students.filter(student => student.grade > 90 && student.name.startsWith('B'))

const index = students.findIndex(student => student.age === 25)
console.log(index)

console.clear
students.forEach(student => console.log(student,students.length))
students.forEach(console.log)