const express = require('express');

// create application
const app = express();

// This response will be sent to Route '/' using 
app.use('/', (req, res, next) => {
    res.send('<h1>Hello from Home</h1>');
    next();
});

// path /form
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

app.listen(3000, 'localhost', () => {
    console.log('App is running on port 3000');
});