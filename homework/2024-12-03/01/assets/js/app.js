"use strict";
(() => {

    function getAverage(numbers) {
        // Check if the input is null or undefined
        if (numbers === null || numbers === undefined) {
            throw new Error("Input cannot be null or undefined.");
        }
        // Check if the input is an array
        if (!Array.isArray(numbers)) {
            throw new Error("Input must be an array.");
        }
        // Check if the array is empty
        if (numbers.length === 0) {
            throw new Error("Array cannot be empty.");
        }
        // Calculate and return the average
        const sum = numbers.reduce((acc, num) => acc + num, 0);
        return sum / numbers.length;
    }
    
    // Add button event listener
    document.getElementById("calculateAverage").addEventListener("click", () => {
        try {
            // Prompt the user for the size of the array
            const size = parseInt(prompt("Enter the size of the array:"), 10);
            if (isNaN(size) || size <= 0) {
                throw new Error("Array size must be a positive integer.");
            }
    
            const numbers = [];
            // Prompt the user to enter numbers
            for (let i = 0; i < size; i++) {
                const input = parseFloat(prompt(`Enter number ${i + 1}:`));
                if (isNaN(input)) {
                    throw new Error("All inputs must be valid numbers.");
                }
                numbers.push(input);
            }
    
            // Call the function and display the result
            const average = getAverage(numbers);
            document.getElementById("result").textContent = `The average is: ${average}`;
        } catch (error) {
            // Handle errors gracefully
            document.getElementById("result").textContent = `Error: ${error.message}`;
        }
    });
    
})();
