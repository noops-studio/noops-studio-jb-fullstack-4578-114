"use strict";

(() => {

    function print() {
        console.log('printing....')
    }

    function alert(message) {
        console.log(message)
    } 
    print()
    alert('this is a message')

    function doPrint() {
        console.log('sfgsdghfggh')
    }
    doPrint()

const  handleFormSubmission = (event) =>{
    event.preventDefault()
    alert('gio')
}

const form = document.getElementById('formidable')
form.addEventListener('submit' , event => {
event.preventDefault()
console.log('submiting')
})
const button = document.getElementById('bouton')
button.addEventListener('click', event => alert('bouton clicked'))

})()


