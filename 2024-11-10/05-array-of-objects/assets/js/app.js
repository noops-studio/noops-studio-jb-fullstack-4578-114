const mira = {
  name: 'Mira',
  age: 22,
  gender: 'female',
  city: 'Petch Tiqwa'
}

const Yoav = {
  name: 'Yoav',
  age: 22,
  gender: 'male',
  city: 'Herzliya'
}

const Beery = {
  name: 'Beery',
  age: 18,
  gender: 'male',
  city: 'Holon'
}

const osher = {
  name: 'osher',
  age: 22,
  gender: 'male',
  city: 'Givat Shmuel'
}

const grades = [100, 96, 55]
const animals = ['dog', 'cat', 'fish']
const friends = [mira, Yoav, Beery, osher]

console.log(friends[0].name)
//this will output the entire array of friends
console.log(friends)
//this will output all the fields of every friend in the array
console.log(friends[0])

for (const friend of friends) {

  for (const property in friend) {
    console.log(`${property} value is ${friend[property]}`)
  }

}

friends.splice(1, 1)

for (const friend of friends) {
  console.log(`${friend.name} is my friend`)
}

console.log(`i have ${friends.length} friends`)

const musicBands = [
  {
    name: 'Nirvana',
    style: 'Rock'
  }, {
    name: 'Beatles',
    style: 'Rock'
  }, {
    name: 'Mashina',
    style: 'israeli'
  }
]

console.log(`bands in my collection ${musicBands.length}`)
