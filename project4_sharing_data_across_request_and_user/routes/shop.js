const path = require('path');
const express = require('express');

const reqData = require('./admin');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
    console.log(reqData.product); // can access request data by importing reqData.product;
    /**
        Bad Practise for export and access data this way, because 

        If A user requested product , 
        and then B user also try to visit webapp from B user also same product will return as a request

        e.g 
        []  // loging reqData.product for HOME PAGE
        []  // loging reqData.product for ADD PAGE
        [ { product: 'giretejas@gmail.com' } ]  // loging reqData.product for PRODUCT PAGE
        [ { product: 'giretejas@gmail.com' } ]  // loging reqData.product for ANOTHER USER HOME PAGE

        
     */
});

module.exports = router;