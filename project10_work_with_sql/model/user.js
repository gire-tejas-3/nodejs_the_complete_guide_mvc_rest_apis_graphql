const db = require('../utils/database');

class User {
	constructor(terms, username, email, password, role) {
		this.terms = terms;
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
	}
    
    save() {
        return db.execute(
            `INSERT INTO users (username, email, password, role, terms) VALUES (?, ?, ?, ?, ?)`,
            [this.username, this.email, this.password, this.role, this.terms],
        );
    }

	static fetchAll() {
		return db.execute(`SELECT * FROM users`);
	}

	static update(id, obj) {
		if (!obj || typeof obj !== 'object') {
			throw new Error('Invalid Data');
		}

		const fieldName = Object.keys(obj);
		const values = Object.values(obj);

		const setFields = fieldName.map((field) => `${field} = ?`).join(', ');

		return db.execute(`Update users SET ${setFields} WHERE (id = ?)`, [
			...values,
			id,
		]);
	}

	static fetchByField(obj) {
		if (typeof obj !== 'object' || !obj) {
			throw new Error('Invalid Criteria');
		}

		const fields = Object.keys(obj);
		const values = Object.values(obj);

		const whreClause = fields.map((field) => `${field} = ?`).join(' AND ');

		return db.execute(`SELECT * FROM users WHERE ${whreClause}`, values);
	}

    static delete(id) {
        return db.execute (
            `DELETE FROM users WHERE id = ${id}`
        );
    }
}

module.exports = User;
