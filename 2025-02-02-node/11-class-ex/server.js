const { createServer } = require("http");

// const  requestListener = (request,Response) => console.log(request);

const user = {
  name: "Yuval",
  email: "yuval@gmail.com",
  age: 23,
};

// /user endpoint to echo the user object

const requestListener = (request, Response) => {
  if (request.url === "/user") {
    console.log("Request to /user endpoint");
    Response.write(JSON.stringify(user));
  } else if (request.url === "/") {
    console.log("Request to / endpoint");
  }
  Response.end();
};

createServer(requestListener).listen(3000);
