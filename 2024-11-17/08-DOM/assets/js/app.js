let sayGoodBye = () => {
  console.log(document.body.firstChild)
document.getElementById('myParagraph').innerText = "goodbye"
}

//this will save name from form
let saveName = () => {
  let name = document.getElementById('name').value
  console.log(name)
  localStorage.setItem('username', name)
}

let restoreName = () => {
  const name = localStorage.getItem('username')
console.log(name)
}