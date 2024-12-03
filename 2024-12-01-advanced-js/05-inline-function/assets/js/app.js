const power2 = (num) => {return num ** 2} 






const printPower2 = (num , powerFunc) => {if(typeof powerFunc !== 'function') return console.log(powerFunc(num))}
printPower2(3, power2)

// now inline function 

printPower2(3 , power2 = (num) => {return num ** 2} )