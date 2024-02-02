const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

dotenv.config();
const app = express();

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// from adminRoutes there are two modules are exported i.e. router itself and product array contains object
// so we have to use here router module so it can be access using adminRoutes.router
app.use('/product', adminRoutes.router);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(port, hostname, () => {
    console.log(`App is running on port ${port}`);
});


