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
const multer = require('multer');

const router = require('./routes/index');
const { createCsrfToken } = require('./utils/csrf');
const AppError = require('./utils/error');

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
app.use(
	multer({
		storage: multer.diskStorage({
			destination: (req, file, cb) => {
				cb(null, path.join(__dirname, 'public', 'assets', 'users'));
			},
			filename: (req, file, cb) => {
				if (file.fieldname === 'profileImage') {
					cb(
						null,
						`user_${Date.now()}${path.extname(file.originalname)}`,
					);
				} else {
					cb(
						null,
						`resume_${Date.now()}${path.extname(
							file.originalname,
						)}`,
					);
				}
			},
		}),
		fileFilter: (req, file, cb) => {
			if (file.fieldname === 'profileImage') {
				if (!file.mimetype.startsWith('image')) {
					return cb(
						new AppError(
							'Only Image format should accepted for profile Image',
							500,
						),
					);
				}

				const ext = path.extname(file.originalname).toLowerCase();
				if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
					return cb(
						new AppError(
							'Only png, jpg and jpeg format are allowed for profile Image',
							500,
						),
					);
				}
			}

			cb(null, true);
		},
	}).fields([{ name: 'resume' }, { name: 'profileImage' }]),
);
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
	res.locals.recaptcha = process.env.RECAPTCHA_SITE;
	next();
});
app.use(router);
// userTest()
app.use((req, res, next) => {
	res.status(404);
	res.render('404.ejs', { title: 'Page Not Found' });
});

app.use((err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';
	console.log(err);
	res.status(err.statusCode).render('500', {
		title: 'Error',
	});
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
