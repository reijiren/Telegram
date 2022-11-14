const db = require('../config/db');

const userModel = {
    // get all users
    selectUsers: () => {
        return new Promise((resolve, reject) => {
            db.query(`
            select * from users;
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },

    // get all workers
    selectWorkers: () => {
        return new Promise((resolve, reject) => {
            db.query(`
            select * from workers join users on users.id = workers.id;
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },

    // find workers pagination
    findWorkers: (skill, page, limit) => {
        return new Promise((resolve, reject) => {
            const offset = (page - 1) * limit;
            
            db.query(`
            select * from workers join users on users.id = workers.id where skill ilike '%${skill}%' order by name asc limit ${limit} offset ${offset};
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },

    // get all user's portofolio
    selectPorto: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`
            select * from portofolio join workers on portofolio.id_user = workers.id join users on users.id = portofolio.id_user where id_user = ${id};
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },

    // get all user's experience
    selectJobExp: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`
            select * from job_experience join workers on job_experience.id_user = workers.id join users on users.id = job_experience.id_user where id_user = ${id};
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },

    // get detail user by id
    selectUserId: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`
            select * from users where id = ${id};
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },

    // get detail worker by id
    selectWorkersId: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`
            select * from workers join users on users.id = workers.id where workers.id = ${id};
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },

    // get detail porto by id
    selectPortoId: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`
            select * from portofolio join workers on portofolio.id_user = workers.id join users on portofolio.id_user = users.id where portofolio.id_porto = ${id};
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },

    // get detail porto by id
    selectJobExpId: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`
            select * from job_experience join workers on job_experience.id_user = workers.id join users on users.id = job_experience.id_user where job_experience.id_exp = ${id};
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },

    // register user
    insertUser: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`
            with ins1 as (
                insert into users (name, email, phone, password, user_type, photo, date_created) values
                ('${data.name}', '${data.email}', '${data.phone}', '${data.password}', ${data.user_type}, '${data.photo}', now())
                returning id as user_id
            )
            insert into ${data.user_type === 0 ? 'workers' : 'recruiters'}(id${data.user_type === 1 ? ', company_name, position' : ''}) values ((select user_id from ins1)${data.user_type === 1 ? `, '${data.company_name}', '${data.position}'` : ''});
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },

    // insert portofolio
    insertPorto: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`
            insert into portofolio (id_user, app_title, image, link, type, date_created) values
            (${data.id_user}, '${data.app_title}', '${data.image}', '${data.link}', ${data.type}, now());
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },

    // insert job experience
    insertJob: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`
            insert into job_experience (id_user, title, company, date_in, date_out, jobdesk, date_created) values
            (${data.id_user}, '${data.title}', '${data.company}', '${data.date_in}', '${data.date_out}', '${data.jobdesk}', now());
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },

    // email validation
    checkEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.query(`
            select * from users where email = '${email}';
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },

    // update workers
    updateWorkers: (id, data, pass) => {
        return new Promise((resolve, reject) => {
            db.query(`
            with upd as (
                update users set
                name = coalesce ($1, name),
                email = coalesce ($2, email),
                phone = coalesce ($3, phone),
                password = coalesce ($4, password),
                job_title = coalesce ($6, job_title),
                city = coalesce ($7, city),
                photo = coalesce ($9, photo),
                bg_photo = coalesce ($10, bg_photo),
                instagram = coalesce ($11, instagram),
                github = coalesce ($12, github),
                gitlab = coalesce ($13, gitlab),
                linkedin = coalesce ($14, linkedin),
                description = coalesce ($15, description)
                from workers
                where users.id = workers.id and users.id = $16
                returning *
            )
            update workers set
            job_type = coalesce ($5, workers.job_type),
            skill = coalesce ($8, workers.skill)
            from upd
            where workers.id = $16;
            `, [data.name, data.email, data.phone, pass, data.job_type, data.job_title, data.city, data.skill, data.photo, data.bg_photo, data.instagram, data.github, data.gitlab, data.linkedin, data.description, id]
            , (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },

    // update photo
    updatePhoto: (id, data) => {
        return new Promise((resolve, reject) => {
            db.query(`
            update users set photo = '${data}' where id = ${id};
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },

    // delete user
    deleteUser: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`
            delete from users where id = ${id};
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },

    // delete portofolio
    deletePorto: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`
            delete from portofolio where id_porto = ${id};
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },

    // delete experience
    deleteExp: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`
            delete from job_experience where id_exp = ${id};
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },
}

module.exports = userModel;