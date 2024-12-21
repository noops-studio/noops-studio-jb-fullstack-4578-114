var number = +prompt('Enter a number: ');
function isPrimeNumber(num) {
    if (num < 2) {
        return false;
    }
    for (var i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}
alert(isPrimeNumber(number) ? "".concat(number, " is a prime number") : "".concat(number, " is not a prime number"));
