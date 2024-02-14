// Data will be stored in data/user.json file

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
	constructor(terms, username, email, password, role) {
		this.terms = terms === 'on' ? 'accepted' : 'rejected';
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
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
				this.id =  Math.floor(Math.random() * 9000)
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

	static update(id, data, cb) {
		readUserFile((existingData) => {
			const existingUser = existingData.find((user) => user.id === data.id || user.id === id);
			// replace exsisting user with new data by object.assign
			Object.assign(existingUser, data)
			fs.writeFile(userDataPath, JSON.stringify(existingData), (err) => {
				if(err) {
					console.log(err);
					cb(null);
				} else {
					cb(existingUser);
				}
			})
		});
	}
	
	static delete(id,cb) {
		readUserFile((exsistingData) => {
			const updatedUser =  exsistingData.filter(user => user.id !== id);
			fs.writeFile(userDataPath, JSON.stringify(updatedUser), (err) => {
				if (err){
					cb(null);
				} else {
					cb(updatedUser);
				}
			} )
		});
	}
}

module.exports = Register;
