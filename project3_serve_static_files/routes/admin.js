const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/add', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'add.html'));
});

router
    .get('/', (req, res, next) => {
        res.sendFile(path.join(__dirname, '../', 'views', 'product.html'));
    })
    .post('/', (req, res, next) => {
        console.log(req.body);
        res.redirect('/');
    });

module.exports = router;