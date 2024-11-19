let students = [
  {
    name: 'Beery',
    lastName: 'ba',
    grade: [98,86,98]
  },
  {
    name: 'Nikol',
    lastName: 'Leviodkin',
    grade: [95,88,98]
  },
  {
    name: 'Shimon',
    lastName: 'Yaniv',
    grade: [95,85,98]
  }
  
]

//print data of each student

for (let student of students) {
  for (let property in student) {
    console.log(`${property} value is ${student[property]}`)

  }
}
let isNormal='n'

if (isNormal==='y') {
  console.log('normal method')

  students.forEach(student => {
    let sum = 0
    student.grade.forEach(grade => {
      sum += grade
    })
    console.log(`avg grade for ${student.name} is ${sum / student.grade.length}`)
  })
} else {
console.log('function method')
function getAvgGrade(student) {
  let sum = 0
  student.grade.forEach(grade => {
    sum += grade
  })
  return sum / student.grade.length
}
//log the avg grade for each student
students.forEach(student => {
  console.log(`avg grade for ${student.name} is ${getAvgGrade(student)}`)
})
}

