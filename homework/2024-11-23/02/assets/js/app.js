// Initialize variables
const studentForm = document.getElementById('studentForm');
const lastNameInput = document.getElementById('lastName');
const scoreInput = document.getElementById('score');
const studentTableBody = document.getElementById('studentTableBody');
const averageScoreParagraph = document.getElementById('averageScore');
let scores = [];

// Function to validate inputs
function validateInputs() {
    let isValid = true;
    if (!lastNameInput.value.trim()) {
        lastNameInput.classList.add('is-invalid');
        isValid = false;
    } else {
        lastNameInput.classList.remove('is-invalid');
    }

    const score = parseInt(scoreInput.value, 10);
    if (isNaN(score) || score < 0 || score > 100) {
        scoreInput.classList.add('is-invalid');
        isValid = false;
    } else {
        scoreInput.classList.remove('is-invalid');
    }
    return isValid;
}

// Function to update average score
function updateAverageScore() {
    if (scores.length === 0) {
        averageScoreParagraph.textContent = 'Average Score: N/A';
        return;
    }
    const average = (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(2);
    averageScoreParagraph.textContent = `Average Score: ${average}`;
}

// Add button click event listener
document.getElementById('addButton').addEventListener('click', () => {
    if (!validateInputs()) return;

    // Add student details to the table
    const lastName = lastNameInput.value.trim();
    const score = parseInt(scoreInput.value, 10);
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${lastName}</td>
        <td>${score}</td>
    `;
    studentTableBody.appendChild(newRow);

    // Update scores and average
    scores.push(score);
    updateAverageScore();

    // Clear inputs
    lastNameInput.value = '';
    scoreInput.value = '';
});
