
const validate = (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    if (!email) {
emailError.innerHTML = `Please provide a valid email`;}
    if (!password.length < 6) {
passwordError.innerHTML = `Please provide a valid password`;
    }
}