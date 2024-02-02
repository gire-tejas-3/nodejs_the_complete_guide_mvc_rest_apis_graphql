const path = require('path');
const express = require('express');
const router = express.Router();

const reqData = [];

router.get('/add', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'add.html'));
});

router
    .get('/', (req, res, next) => {
        res.sendFile(path.join(__dirname, '../', 'views', 'product.html'));
    })
    .post('/', (req, res, next) => {
        reqData.push({product: req.body.product});
        res.redirect('/');
    });

// module.exports = router;
exports.router = router; // exported router module
exports.product = reqData; // exported reqData Array as module