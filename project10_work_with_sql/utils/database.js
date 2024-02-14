const mysql =  require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const dbHost = process.env.DB_HOSTNAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const pool =  mysql.createPool({
    host: dbHost,
    user: dbUser,
    database: dbName,
    password: dbPassword
});

module.exports = pool.promise();