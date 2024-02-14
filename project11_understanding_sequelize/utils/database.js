// with sequelize (ORM)
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const dbName = process.env.DB_NAME;
const dbPassword = process.env.DB_PASSWORD;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOSTNAME;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
	dialect: 'mysql',
	host: dbHost,
});

module.exports = sequelize;


// with core SQL
// const mysql =  require('mysql2');
// const dotenv = require('dotenv');

// dotenv.config();

// const dbHost = process.env.DB_HOSTNAME;
// const dbUser = process.env.DB_USER;
// const dbPassword = process.env.DB_PASSWORD;
// const dbName = process.env.DB_NAME;

// const pool =  mysql.createPool({
//     host: dbHost,
//     user: dbUser,
//     database: dbName,
//     password: dbPassword
// });

// module.exports = pool.promise();
