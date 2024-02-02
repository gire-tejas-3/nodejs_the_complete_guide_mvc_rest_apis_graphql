const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const {engine} =  require('express-handlebars');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

dotenv.config();
const app = express();

// set value for view engine is pug and views.
app.engine('handlebars', engine({defaultLayout: false})) // creating engine for handlebars using engine()
app.set('view engine', ['pug','ejs', 'handlebars']); // set view engines
app.set('views', __dirname + '/views'); //set views directory

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/product', adminRoutes.router);
app.use(shopRoutes);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    // render ejs file with data
    res.render('404.ejs', {title: 'Page Not Found'});
});

app.listen(port, hostname, () => {
    console.log(`App is running on port ${port}`);
});