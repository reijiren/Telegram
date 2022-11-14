const db = require('../config/db');

const recModel = {
    // get all recruiters
    selectRecruiters: () => {
        return new Promise((resolve, reject) => {
            db.query(`
            select * from recruiters join users on users.id = recruiters.id;
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },

    // get detail recruiter by id
    selectRecruitersId: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`
            select * from recruiters join users on users.id = recruiters.id where recruiters.id = ${id};
            `, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },

    // update recruiters
    updateRecruiters: (id, data, pass) => {
        return new Promise((resolve, reject) => {
            db.query(`
            with upd as (
                update users set
                name = coalesce ($1, name),
                email = coalesce ($2, email),
                phone = coalesce ($3, phone),
                password = coalesce ($4, password),
                job_title = coalesce ($5, job_title),
                city = coalesce ($9, city),
                photo = coalesce ($10, photo),
                bg_photo = coalesce ($11, bg_photo),
                instagram = coalesce ($12, instagram),
                github = coalesce ($13, github),
                gitlab = coalesce ($14, gitlab),
                linkedin = coalesce ($15, linkedin),
                description = coalesce ($16, description)
                from recruiters
                where users.id = recruiters.id and users.id = $17
                returning *
            )
            update recruiters set
            company_name = coalesce ($6, recruiters.company_name),
            position = coalesce ($7, recruiters.position),
            company_field = coalesce ($8, recruiters.company_field)
            from upd
            where recruiters.id = $17
            `, [data.name, data.email, data.phone, pass, data.job_title, data.company_name, data.position, data.company_field, data.city, data.photo, data.bg_photo, data.instagram, data.github, data.gitlab, data.linkedin, data.description, id]
            , (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        })
    },
}

module.exports = recModel;