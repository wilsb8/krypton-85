const http = require("http"); // require http
const app = require("./app/app");
// require(ment) declaration
require("dotenv").config(); // read from our .env file


// create listen server
http.createServer(app).listen(process.env.PORT || 5000, ()=> {
    console.log(`Server here. I am fully operational and listening on port: ${process.env.PORT}`)
});