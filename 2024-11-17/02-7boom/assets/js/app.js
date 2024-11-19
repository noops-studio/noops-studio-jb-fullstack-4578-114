const getUserInput = () => {
    return parseInt(prompt("Please enter a number enter 0 to stop"));
}

const ifBoom = (number) => {
    if (number % 7 === 0 || number.toString().includes('7')) {
        return true;
    } else {
        return false;
    }
}

let userInput = getUserInput();

while (userInput !== 0) {
    if (ifBoom(userInput) === true) {
        alert(`${userInput} boom`);
    } else {
        alert(`${userInput} not boom`);
    }
    userInput = getUserInput();
}