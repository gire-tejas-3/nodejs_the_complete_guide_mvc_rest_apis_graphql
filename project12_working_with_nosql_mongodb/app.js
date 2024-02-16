const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const mongoConnect =  require('./utils/database').mongoConnect;

dotenv.config();

const app = express();

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

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

mongoConnect(()=>{
	app.listen(port, hostname, ()=>{
		console.log(`App is running on http://${hostname}:${port}`);
	}); 
})