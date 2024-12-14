"use strict";

(() => {
     // Function to fetch the list of users
function loadUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            const selectElement = document.getElementById('userSelect');
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.name;
                selectElement.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
}

// Function to load user details
// Function to load user details with an extended loading time
function loadUserDetails(userId) {
    const userDetailsElement = document.getElementById('userDetails');
    const loadingMessage = document.getElementById('loadingMessage');
    userDetailsElement.style.display = 'none';  // Hide user details initially
    loadingMessage.style.display = 'block';  // Show loading message

    // Set a timeout to extend the loading time (e.g., 3 seconds)
    setTimeout(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(response => response.json())
            .then(user => {
                loadingMessage.style.display = 'none';  // Hide loading message after delay
                userDetailsElement.style.display = 'block';  // Show user details

                // Populate the user details
                document.getElementById('userName').textContent = user.name;
                document.getElementById('userUsername').textContent = user.username;
                document.getElementById('userEmail').textContent = user.email;
                document.getElementById('userPhone').textContent = user.phone;
                document.getElementById('userCity').textContent = user.address.city;
                document.getElementById('userStreet').textContent = user.address.street;
                document.getElementById('userZipcode').textContent = user.address.zipcode;
                document.getElementById('userCompany').textContent = user.company.name;
            })
            .catch(error => {
                loadingMessage.style.display = 'none';
                console.error('Error fetching user details:', error);
            });
    }, 3000);  // Delay for 3 seconds before making the request (change this value to adjust the delay)
}
// Event listener for selecting a user
document.getElementById('userSelect').addEventListener('change', function () {
    const userId = this.value;
    if (userId) {
        loadUserDetails(userId);
    } else {
        document.getElementById('userDetails').style.display = 'none';  // Hide details if no user is selected
    }
});

// Load the list of users on page load
loadUsers();

})();