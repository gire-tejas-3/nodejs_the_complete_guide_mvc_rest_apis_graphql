const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
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

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(router);

app.use((req, res, next) => {
	res.status(404);
	res.render('404.ejs', { title: 'Page Not Found' });
});

mongoose.connect(mongoUri).then(result => {
	console.log("DB Connected!")
	app.listen(port, hostname, () => {
		console.log(`App is running on http://${hostname}:${port}`);
	});
}).catch(error => {
	console.log("DB Connection Error: " + error)
});