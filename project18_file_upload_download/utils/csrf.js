const Csrf = require('csrf');
const dotenv = require('dotenv');

dotenv.config();

const csrf = new Csrf();

function createCsrfToken(req, res, next) {
	const _secret = process.env.CSRF_SECRET;
	const token = csrf.create(_secret);
	res.locals.csrfToken = token;
	next();
}

function verifyCsrfToken(_token) {
	try {
		const _secret = process.env.CSRF_SECRET;
		return csrf.verify(_secret, _token);
	} catch (error) {
		console.log('CSRF verification error:', error);
		return false;
	}
}

module.exports = {
	createCsrfToken,
	verifyCsrfToken,
};
