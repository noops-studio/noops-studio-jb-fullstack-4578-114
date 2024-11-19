// // Function to reverse each string in an array

// function getReversed(arr) {
//   return arr.map(str => str.split('').reverse().join(''));
// }
// // Function to check if each string in an array is a palindrome

// function isPalindrom(arr) {
//   return arr.map(str => {
//       const reversedStr = str.split('').reverse().join('');
//       return str === reversedStr;
//   });
// }

// Function to reverse a given string
function getReversed(str) {
  // Split the string into an array of characters, reverse the array, and join it back into a string
  return str.split('').reverse().join('');
}
// Function to check if a given string is a palindrome
function isPalindrome(str) {
  // Check if the string is equal to its reversed version
  return str === getReversed(str);
}


// Test the getReversed function
console.log(getReversed("hay"))
// Test the isPalindrome function
console.log(isPalindrome("סוס"))