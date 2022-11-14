const db = require('../config/db');

const userModel = {
    // get all users
    selectAllUser: () => {
        return new Promise((resolve, reject) => {
			db.query(`
            select * from users;
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
		});
    },

    // get detail user
    selectUserId: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`
            select * from users where id_user = ${id};
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        });
    },

    // check email
    findEmail: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`
            select * from users where email = '${data}';
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        });
    },

    // register
    insertUser: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`
            insert into users (name, email, password, image, date_created)
            values ('${data.name}', '${data.email}', '${data.password}', 'default.png', now());
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        });
    },

    // update user
    updateUser: (data) => {
        return new Promise((resolve, reject) => {
			db.query(
			`
			UPDATE users SET
			name = COALESCE ($2, name),
			phone = COALESCE ($3, phone),
			password = COALESCE ($4, password),
			image = COALESCE ($5, image),
			bio = COALESCE ($6, bio)
			WHERE id_user = $1
			`,
				[data.id, data.name, data.phone, data.password, data.image, data.bio],
				(err, res) => {
                    if(err) return reject(err);
                    resolve(res);
				});
		});
    }
}

module.exports = userModel;