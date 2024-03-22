const nodemailer = require('nodemailer');
const fs = require('fs').promises; // Use promises version of fs
const mailgunTransport = require('nodemailer-mailgun-transport');
const dotenv = require('dotenv');
const path = require('path');
const ejs = require('ejs'); // Import ejs module

dotenv.config();

const mailApi = nodemailer.createTransport(
	mailgunTransport({
		auth: {
			api_key: process.env.MILGUN_API_KEY,
			domain: process.env.MILGUN_DOMAIN,
		},
	}),
);

async function sendMail(_email, _subject, _html) {
	try {
		let renderTemplate = _html;

		if (typeof _html === 'object') {
			const emailTemplate = await fs.readFile(
				path.join(__dirname, '..', 'views', 'email.ejs'),
				{ encoding: 'utf-8' },
			);
			renderTemplate = ejs.render(emailTemplate, _html);
		}

		const result = await mailApi.sendMail({
			from: 'TejTech Pvt Ltd <giretejas@gmail.com>',
			to: _email,
			subject: _subject,
			replyTo: 'giretejas@gmail.com',
			html: renderTemplate,
		});

		console.log('Sent Message Info: ' + JSON.stringify(result));
		return result;
	} catch (error) {
		console.log('Error sending Mail: ' + JSON.stringify(error));
		throw error; // Rethrow the error for proper error handling in the caller
	}
}

module.exports = sendMail;
