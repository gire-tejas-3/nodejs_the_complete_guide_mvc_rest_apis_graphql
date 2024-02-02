const express = require('express');
const bodyParser =  require('body-parser');

// create application
const app = express();

/*
*************************************************************************************************************
To parse payload using req.body need to use middleware express.json() and express.urlencoded({extended: true}), 
Otherwise req.body get undefined
*************************************************************************************************************
*/

// using body-parser middleware 
app.use(bodyParser.urlencoded({extended: false})); 

/* buit in middleware(new version of express 4.16.*) for It parses incoming requests with JSON payloads and 
is based on body-parser*/
app.use(express.json()); 
/* buit in middleware(new version of express 4.16.*) for It parses incoming requests with url encoded payloads and 
is based on body-parser*/
app.use(express.urlencoded({extended: true})); 

// This response will be sent to Route '/' using 

app.use('/form', (req, res, next) => {
    const html = `
        <h1>Form</h1><br><br>
        <form action="/product" method="post">
            <input type="email" placeholder="email" name="email" ><br><br>
            <button type="submit">Submit</button>
        </form>
    `;
    res.status = 200;
    res.send(html);
});

app.use('/product', (req, res, next) => {
    // parsing incoming request payloads using req.body
    console.log(req.body)
    // redirect to home path
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    res.send('<h1>Home</h1>');
});

app.listen(3000, 'localhost', () => {
    console.log('App is running on port 3000');
});