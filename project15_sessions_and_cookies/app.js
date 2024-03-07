const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const session = require('express-session');
const MongoStore   = require('connect-mongodb-session')(session); 
const mongoose = require('mongoose');

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
})

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
		resave: false,
		saveUninitialized: false,
		store: store
	}),
);

app.use(router);

app.use((req, res, next) => {
	res.status(404);
	res.render('404.ejs', { title: 'Page Not Found' });
});

mongoose
	.connect(mongoUri)
	.then((result) => {
		console.log('DB Connected!');
	})
	.catch((error) => {
		console.log('DB Connection Error: ' + error);
	});

const server = app.listen(port, hostname, () => {
	console.log(`App is running on http://${hostname}:${port}`);
});
