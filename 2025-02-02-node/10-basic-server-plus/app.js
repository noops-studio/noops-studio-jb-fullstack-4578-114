const {createServer} = require("http")

const  requestListener = (request,Response) => console.log(request);

createServer(requestListener).listen(3000);