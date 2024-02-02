const express = require('express');

const router = express.Router();

/**
   A router behaves like middleware itself, so you can use it as an argument to app.use() 
   or as the argument to another router’s use() method.

   The top-level express object has a Router() method that creates a new router object.
   
   Once you’ve created a router object, you can add middleware and HTTP method routes 
   (such as get, put, post, and so on) to it

 */
router.get('/form', (req, res, next) => {
    const html = `
        <h1>Form</h1><br><br>
        <form action="/admin/product" method="post">
            <input type="email" placeholder="email" name="email" ><br><br>
            <button type="submit">Submit</button>
        </form>
    `;
    res.status = 200;
    res.send(html);
});

router.post('/product', (req, res, next) => {
    // parsing incoming request payloads using req.body
    console.log(req.body)
    // redirect to home path
    res.redirect('/');
});

module.exports = router;