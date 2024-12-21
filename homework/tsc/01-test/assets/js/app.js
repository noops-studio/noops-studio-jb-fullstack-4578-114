function app() {
    var firstName = prompt("Enter your first name") || "";
    var lastName = prompt("Enter your last name") || "";
    var email = prompt("Enter your email") || "";
    var phone = parseInt(prompt("Enter your phone number") || "0");
    var age = parseInt(prompt("Enter your age") || "0");
    var user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        age: age,
    };
    document.write("\n    <h1>User Information</h1>\n    <p>First Name: ".concat(user.firstName, "</p>\n    <p>Last Name: ").concat(user.lastName, "</p>\n    <p>Email: ").concat(user.email, "</p>\n    <p>Phone: ").concat(user.phone, "</p>\n    <p>Age: ").concat(user.age, "</p>\n"));
}
app();
