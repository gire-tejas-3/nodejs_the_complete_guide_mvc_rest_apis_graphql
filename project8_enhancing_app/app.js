const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const homeRoutes = require('./routes/index');

dotenv.config();

const app = express();

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
const sessionVal = process.env.SESSION;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1) // trust first proxy
app.use(
	session({
		secret: sessionVal,
		resave: false,
		saveUninitialized: true,
		cookie: {secure: true,}
	}),
);

app.use('/', homeRoutes);

app.use((req, res, next) => {
	res.status(404);
	res.render('404.ejs', { title: 'Page Not Found' });
});

app.listen(port, hostname, () => {
	console.log(`App is running on port ${port}`);
});
