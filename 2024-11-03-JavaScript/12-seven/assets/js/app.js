let number = parseInt(prompt("Please enter a number enter 0 to stop"));

while (number !== 0) {
  if (number % 7 === 0) {
    alert(`${number} boom`);
  } else {
    alert(`${number} not boom`);
  }
  
  number = parseInt(prompt("Please enter a number enter 0 to stop"));
}

document.write("end of game");
