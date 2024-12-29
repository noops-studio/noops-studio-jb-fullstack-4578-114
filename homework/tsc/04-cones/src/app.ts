// Get references to HTML elements
const inputElement = document.getElementById("numberInput") as HTMLInputElement;
const buttonElement = document.getElementById("generateButton") as HTMLButtonElement;

buttonElement.addEventListener("click", () => {
    const inputNumber = parseInt(inputElement.value);

    if (isNaN(inputNumber) || inputNumber <= 0) {
        alert("Please enter a positive integer.");
        return;
    }

    const stars = generateStarTriangles(inputNumber);
    const contentElement = document.getElementById('content');
    if (contentElement) {
        contentElement.innerHTML += stars;
    }
});

function generateStarTriangles(n: number): string {
    let result = "";

    // Generate top-down triangle
    for (let i = 0; i < n; i++) {
        const spaces = " ".repeat(n - i - 1);
        const stars = "* ".repeat(i + 1);
        result += `${spaces}${stars.trim()}<br>`;
    }

    // Generate bottom-up triangle
    for (let i = n - 2; i >= 0; i--) {
        const spaces = " ".repeat(n - i - 1);
        const stars = "* ".repeat(i + 1);
        result += `${spaces}${stars.trim()}<br>`;
    }

    return result;
}
