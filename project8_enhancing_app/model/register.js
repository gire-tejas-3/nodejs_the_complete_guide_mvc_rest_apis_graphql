const path = require('path');
const fs = require('fs');

const userDataPath = path.join(
	path.dirname(require.main.filename),
	'data',
	'user.json',
);

function readUserFile(cb) {
	fs.readFile(userDataPath, (err, userData) => {
		if (err) return cb([]);
		if (userData.length === 0) return cb([]);
		cb(JSON.parse(userData));
	});
}

class Register {
	constructor(terms, username, email, password) {
		this.terms = terms;
		this.username = username;
		this.email = email;
		this.password = password;
	}

	save() {
		let data = [];
		readUserFile((exsistingData) => {
			data = exsistingData;
			const isExsistUser = exsistingData.find(
				(exsistingUser) =>
					exsistingUser.username === this.username ||
					exsistingUser.email === this.email,
			);

			if(!isExsistUser || isExsistUser === undefined){
				data.push(this);
				fs.writeFile(userDataPath, JSON.stringify(data), (error) => {
					console.log('Error: ' + error);
				});
			} else {
				console.log("User Already Exsists")
			}

		});
	}

	static fetchAll(cb) {
		readUserFile(cb);
	}
}

module.exports = Register;
