const showUserLocation = () => {
 const location = navigator.geolocation.getCurrentPosition(mylocation =>
  { 
    console.log(`mylocation is ${mylocation}`)

})
console.log('after getting current position')
console.log(location)
}