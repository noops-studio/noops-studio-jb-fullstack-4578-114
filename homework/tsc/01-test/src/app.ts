function app () {

const firstName: string = prompt("Enter your first name") || "";
  const lastName: string = prompt("Enter your last name") || "";
  const email: string = prompt("Enter your email") || "";
  const phone: number = parseInt(prompt("Enter your phone number") || "0");
  const age: number = parseInt(prompt("Enter your age") || "0");


const user = {
  firstName,
  lastName,
  email,
  phone,
  age,
};

document.write(`
    <h1>User Information</h1>
    <p>First Name: ${user.firstName}</p>
    <p>Last Name: ${user.lastName}</p>
    <p>Email: ${user.email}</p>
    <p>Phone: ${user.phone}</p>
    <p>Age: ${user.age}</p>
`);

}

app()