const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const dotenv = require('dotenv');

dotenv.config();

let mongoUri = process.env.MONGODB_URI;
let _db;
mongoUri = mongoUri
	.replace('<username>', process.env.MONGODB_USERNAME)
	.replace('<password>', process.env.MONGODB_PASSWORD)
	.replace('<dbName>', process.env.MONGODB_DBNAME);

function mongoConnect(callback) {
	mongoClient
		.connect(mongoUri)
		.then((client) => {
			_db = client.db();
			callback();
			console.log('DB CONNECTED!');
		})
		.catch((error) => {
			throw error;
		});
};

function getDB() {
	if(_db) {
		return _db;
	}

	throw "No Database Found!"
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;