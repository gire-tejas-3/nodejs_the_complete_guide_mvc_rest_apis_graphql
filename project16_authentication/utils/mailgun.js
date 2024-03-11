const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');
const dotenv = require('dotenv');

dotenv.config();

const mailApi = nodemailer.createTransport(
	mailgunTransport({
		auth: {
			api_key: process.env.MILGUN_API_KEY,
			domain: process.env.MILGUN_DOMAIN,
		},
	}),
);

function sendMail(_email, _subject, _html, _text = '') {
	return mailApi
		.sendMail({
			from: 'TejTech Pvt Ltd <giretejas@gmail.com>',
			to: _email,
			subject: _subject,
			replyTo: 'giretejas@gmail.com',
			html: _html,
			text: _text,
		})
		.then((result) => {
			console.log('Sent Message Info: ' + JSON.stringify(result));
		})
		.catch((error) => {
			console.log('Error to send Mail: ' + JSON.stringify(error));
		});
}

module.exports = sendMail;
