function displayInputPower2() {
    console.log(input ** 2)
}

function inputIsEven(input){
    return input % 2 === 0
}

let input = getInputFromUser()

while (userStillWantsToContinue(input)) {
    if (inputIsEven()) {
        displayInputPower2()
    }
    if(inputIsDeviderOf3()){
     displayInputPower3()
    }
}