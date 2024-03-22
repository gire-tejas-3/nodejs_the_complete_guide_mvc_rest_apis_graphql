const dotenv = require('dotenv');
const http = require('http');
const { nextTick } = require('process');
const url = require('url');
const AppError = require('./error');

dotenv.config();

function verifyRecaptcha(recaptchaToken) {
	const secrete = process.env.RECAPTCHA_SECRETE;

	return new Promise((resolve, reject) => {
		const data = new url.URLSearchParams({
			secrete: secrete,
			response: recaptchaToken,
		}).toString();

		const request = http.request(
			{
				hostname: 'www.google.com',
				port: 443,
				path: '/recaptcha/api/siteverify',
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': Buffer.byteLength(data),
				},
			},
			(res) => {
				let resData = '';
				res.on('data', (chunk) => {
					data += chunk;
				});

				res.on('end', async () => {
					try {
						const responseData = await JSON.parse(resData);
						resolve(responseData);
					} catch (error) {
						reject(error);
					}
				});
			},
		);

		request.on('error', (error) => {
			reject(error);
		});

		request.write(data);
		request.end();
	});
}

module.exports = verifyRecaptcha;
