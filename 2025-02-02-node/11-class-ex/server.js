const { createServer } = require("http");

// const  requestListener = (request,Response) => console.log(request);

const user = {
  name: "Yuval",
  email: "yuval@gmail.com",
  age: 23,
};

const users = [
  {
    name: "Yuval",
    email: "yuval@gmail.com",
    age: 23,
},
{
    name: "Yuval",
    email: "yuval@gmail.com",
    age: 23,
},  {
    name: "Yuval",
    email: "yuval@gmail.com",
    age: 23,
}];


// /user endpoint to echo the user object

const requestListener = (request, response) => {
  switch (request.url) {
    case "/user":
      console.log("Request to /user endpoint");
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(user));
      break;
    case "/list":
      response.setHeader("Content-Type", "text/plain");
      response.write("name,email,age\n");
      users.forEach((user) => {
        response.write(`${user.name},${user.email},${user.age}\n`);
      });
      break;
    case "/":
      response.setHeader("Content-Type", "application/json");
      console.log("Request to / endpoint");
      break;
    default:
      response.setHeader("Content-Type", "text/plain");
      response.write("404 Not Found");
      break;
  }
  response.end();
};

createServer(requestListener).listen(3000);
