let friends = [
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
// turns the object into a JSON string
const jsonString =JSON.stringify(friends)
document.write(jsonString)
console.log(friends)
console.log(jsonString)

// turns the JSON string back into an object

const friendsJsonPrase = JSON.parse(jsonString)
console.log(`i have ${friendsJsonPrase} friends`)