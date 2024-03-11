const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const path = require('path');
const toastr = require('express-toastr');
const flash = require('connect-flash');
const MongoStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');

const router = require('./routes/index');
const { createCsrfToken } = require('./utils/csrf');

dotenv.config();

const app = express();

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
let mongoUri = process.env.MONGODB_URI;

mongoUri = mongoUri
	.replace('<username>', process.env.MONGODB_USERNAME)
	.replace('<password>', process.env.MONGODB_PASSWORD)
	.replace('<dbName>', process.env.MONGODB_DBNAME);

const store = new MongoStore({
	uri: mongoUri,
	collection: 'sessions',
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(
	session({
		secret: process.env.SESSION_SECURE_KEY,
		resave: true,
		saveUninitialized: true,
		store: store,
	}),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(toastr());
app.use(createCsrfToken);
app.use(function (req, res, next) {
	res.locals.toasts = req.toastr.render();
	next();
});

app.use(router);
app.use((req, res, next) => {
	res.status(404);
	res.render('404.ejs', { title: 'Page Not Found' });
});

mongoose
	.connect(mongoUri)
	.then(() => {
		console.log('DB Connected!');
	})
	.catch((error) => {
		console.log('DB Connection Error: ' + error);
	});

app.listen(port, hostname, () => {
	console.log(`App is running on http://${hostname}:${port}`);
});
