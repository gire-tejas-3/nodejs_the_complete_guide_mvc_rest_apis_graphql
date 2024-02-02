/**
    Middleware functions are functions that have access to the request object (req), the response 
    object (res), and the next function in the application’s request-response cycle. The next 
    function is a function in the Express router which, when invoked, executes the middleware 
    succeeding the current middleware.

    Middleware functions can perform the following tasks:

    - Execute any code.
    - Make changes to the request and the response objects.
    - End the request-response cycle.
    - Call the next middleware in the stack.
    - If the current middleware function does not end the request-response cycle, it must 
        call next() to pass control to the next middleware function. Otherwise, the 
        request will be left hanging.

    
 */

//  example of miidleware

const express = require('express');
const dotenv = require("dotenv")
dotenv.config();

const app = express();

app.use('/', (req, res, next) => {
    // this callback function is middleware
    next();
});

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

app.listen(port, hostname, () => {
    console.log(`App is running on PORT ${port}`)
});