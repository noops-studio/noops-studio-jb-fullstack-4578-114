const showUserLocation = () => {
 const location = navigator.geolocation.getCurrentPosition(mylocation => console.log(mylocation))

}

showUserLocation()