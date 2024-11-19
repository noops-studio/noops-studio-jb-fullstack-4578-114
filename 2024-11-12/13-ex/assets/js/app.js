function isPrime(number) {
  if(typeof number !== 'number')return undefined
  if (number <= 1) return false;
  if (number <= 3) return true;

  if (number % 2 === 0 || number % 3 === 0) return false; 

  
  for (let i = 5; i * i < number; i += 6) {
      if (number % i === 0 || number % (i + 2) === 0) return false;
  }

  return true; 
}

function isPrimeForEach(number) {
  if (typeof number !== 'number') return undefined;
  if (number <= 1) return false;
  if (number <= 3) return true;

  if (number % 2 === 0 || number % 3 === 0) return false;

  let divisors = [];
  for (let i = 5; i * i <= number; i += 6) {
    divisors.push(i, i + 2);
  }

  let isPrime = true;
  divisors.forEach(divisor => {
    if (number % divisor === 0) {
      isPrime = false;
    }
  });

  return isPrime;
}



num = +prompt('enter a number')
console.log(`normal ${isPrime(num)}`)
console.log(`foreach ${isPrimeForEach(num)}`)
