
const number = +prompt('Enter a number: ')
function isPrimeNumber (num: number): boolean {
  if (num < 2) {
    return false
  }

  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false
    }
  }

  return true
}
alert(isPrimeNumber(number) ? `${number} is a prime number` : `${number} is not a prime number`)