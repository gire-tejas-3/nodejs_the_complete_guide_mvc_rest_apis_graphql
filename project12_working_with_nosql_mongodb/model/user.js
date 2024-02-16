const { ObjectId } = require('mongodb');

const getDB = require('../utils/database').getDB;

class User {
	constructor(username, email, password, terms, role) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.terms = terms;
		this.role = role;
	}

	save() {
		const db = getDB();
		return db
			.collection('users')
			.insertOne(this)
			.then((result) => {
				console.log(result);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	static fetchAll() {
		const db = getDB();
		return db
			.collection('users')
			.find({})
			.toArray()
			.then((result) => {
				return result;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	static fetchByField(fields) {
		const db = getDB();
		return db
			.collection('users')
			.findOne(fields)
			.then((result) => {
				return result;
			})
			.catch((error) => {
				console.log(error);
			});
	}

	static update(id, body) {
		const db = getDB();
		id = new ObjectId(String(id));

		return db
			.collection('users')
			.updateOne({ _id: id }, { $set: { ...body } }, { upsert: false })
			.then((result) => {
				return result;
			})
			.catch((error) => {
				console.log(error);
			});
	}

	static delete(_id) {
		const db = getDB().collection('users');

		return db
			.deleteOne({ _id })
			.then((result) => {
				return result;
			})
			.catch((error) => {
				console.log(error);
			});
	}
}

module.exports = User;
