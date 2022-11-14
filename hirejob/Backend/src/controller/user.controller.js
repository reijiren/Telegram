const userModel = require('../model/user.model');
const { success, failed, successWithToken } = require('../helper/response');

const bcrypt = require('bcrypt');
const jwtToken = require('../helper/generateJWT');

const userController = {
    // get all user
    listUser: (req, res) => {
        userModel.selectUsers()
        .then((result) => {
            success(res, result.rows, 'success', 'get all users success');
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'failed to get all users');
        })
    },

    // get all workers
    listWorkers: (req, res) => {
        userModel.selectWorkers()
        .then((result) => {
            success(res, result.rows, 'success', 'get all workers success');
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'failed to get all workers');
        })
    },

    // get portofolio user
    listPorto: (req, res) => {
        const id = req.params.id;

        userModel.selectPorto(id)
        .then((result) => {
            success(res, result.rows, 'success', `get all user's portofolio success`);
        })
        .catch((err) => {
            failed(res, err.message, 'failed', `failed to get all user's portofolio`);
        })
    },

    // get user experience
    listExp: (req, res) => {
        const id = req.params.id;

        userModel.selectJobExp(id)
        .then((result) => {
            success(res, result.rows, 'success', `get all user's experience success`);
        })
        .catch((err) => {
            failed(res, err.message, 'failed', `failed to get all user's experience`);
        })
    },

    // search
    search: (req, res) => {
        const body = req.body;
        const search = body.search || '';
        const page = body.page || 1;
        const limit = body.limit || 2;

        userModel.findWorkers(search, page, limit)
        .then((result) => {
            success(res, result.rows, 'success', `search user success`);
        })
        .catch((err) => {
            failed(res, err.message, 'failed', `failed to search user`);
        })
    },

    // get detail user
    detailUser: (req, res) => {
        const id = req.params.id;

        userModel.selectWorkersId(id)
        .then((result) => {
            success(res, result.rows, 'success', `get detail worker success`);
        })
        .catch((err) => {
            failed(res, err.message, 'failed', `failed to get worker detail`);
        })
    },

    // check email
    checkEmail: (req, res) => {
        const email = req.params.email;

        userModel.checkEmail(email)
        .then((result) => {
            success(res, result.rows, 'success', `check email success`);
        })
        .catch((err) => {
            failed(res, err.message, 'failed', `failed to check email`);
        })
    },

    // get portofolio detail
    detailPorto: (req, res) => {
        const id = req.params.id;

        userModel.selectPortoId(id)
        .then((result) => {
            success(res, result.rows, 'success', `get detail portofolio success`);
        })
        .catch((err) => {
            failed(res, err.message, 'failed', `failed to get portofolio detail`);
        })
    },

    // get experience detail
    detailExp: (req, res) => {
        const id = req.params.id;

        userModel.selectJobExpId(id)
        .then((result) => {
            success(res, result.rows, 'success', `get detail experience success`);
        })
        .catch((err) => {
            failed(res, err.message, 'failed', `failed to get experience detail`);
        })
    },

    // register user
    register: (req, res) => {
        try{
            const { name, email, phone, password, user_type, company_name, position } = req.body;
            bcrypt.hash(password, 10, (err, hash) => {
                if(err) failed(res, err.message, 'failed', 'failed to hash password');

                const data = {
                    name,
                    email,
                    phone,
                    password: hash,
                    user_type,
                    company_name,
                    position,
                    photo: req.file ? req.file.filename : 'default.png',
                }

                userModel.checkEmail(email)
                .then((result) => {
                    if(result.rowCount === 0){
                        userModel.insertUser(data)
                        .then((result) => {
                            success(res, result.rowCount, "success", "register success");
                        })
                        .catch((err) => {
                            failed(res, err.message, 'failed', `register failed`);
                        })
                    }else{
                        failed(res, null, 'failed', `email already taken`);
                    }
                })
                .catch((err) => {
                    failed(res, err.message, 'failed', `failed to check email user`);
                })
                
            })
        }catch(err){
            console.error(err);
        }
    },

    // login user
    login: (req, res) => {
		const { email, password } = req.body;

		userModel.checkEmail(email)
        .then((result) => {
            if (result.rowCount !== 0) {
                const user = result.rows[0];
                
                bcrypt.compare(password, user.password)
                .then(async (result) => {
                    if (result) {
                        const token = await jwtToken({
                            email: user.email,
                            type: user.user_type,
                        });
                        delete user.password;
                        successWithToken(
                            res,
                            { token, data: user },
                            "success",
                            "login success"
                        );
                    } else {
                        failed(res, null, "failed", "username or password incorrect");
                    }
                });
            }else{
                failed(res, null, "failed", "username or password incorrect");
            }
        })
        .catch((err) => {
            failed(res, err.message, "failed", "internal server error");
        });
	},

    // insert portofolio
    insertPorto: (req, res) => {
        const body = req.body;
        const image = req.file? req.file.filename : "defaultPorto.png";

        const data = {
            ...body,
            image: image
        }

        userModel.insertPorto(data)
        .then((result) => {
            success(res, result.rowCount, 'success', `insert portofolio success`);
        })
        .catch((err) => {
            failed(res, err.message, 'failed', `failed to insert portofolio`);
        })
    },

    // insert experience
    insertExp: (req, res) => {
        const body = req.body;

        userModel.insertJob(body)
        .then((result) => {
            success(res, result.rowCount, 'success', `insert experience success`);
        })
        .catch((err) => {
            failed(res, err.message, 'failed', `failed to insert experience`);
        })
    },

    // update user
    updateUser: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        const newPass = body.password ? bcrypt.hashSync(body.password, 10) : null;

        userModel.updateWorkers(id, body, newPass)
        .then((result) => {
            success(res, result.rowCount, "success", "update user success");
        })
        .catch((err) => {
            failed(res, err.message, "failed", "failed to update user");
        });
    },

    // update photo
    updatePhoto: async(req, res) => {
        const id = req.params.id;
        const img = req.file.filename;

        await userModel.updatePhoto(id, img)
        .then((result) => {
            success(res, result.rowCount, "success", "update photo success");
        })
        .catch((err) => {
            failed(res, err.message, "failed", "failed to update photo");
        });
    },

    // delete user
    deleteUser: (req, res) => {
        const id = req.params.id;

        userModel.deleteUser(id)
        .then((result) => {
            success(res, result.rowCount, 'success', `delete user success`);
        })
        .catch((err) => {
            failed(res, err.message, 'failed', `failed to delete user`);
        })
    },

    // delete portofolio
    deletePorto: (req, res) => {
        const id = req.params.id;

        userModel.deletePorto(id)
        .then((result) => {
            success(res, result.rowCount, 'success', `delete portofolio success`);
        })
        .catch((err) => {
            failed(res, err.message, 'failed', `failed to delete portofolio`);
        })
    },

    // delete experience
    deleteExp: (req, res) => {
        const id = req.params.id;

        userModel.deleteExp(id)
        .then((result) => {
            success(res, result.rowCount, 'success', `delete experience success`);
        })
        .catch((err) => {
            failed(res, err.message, 'failed', `failed to delete experience`);
        })
    },
}

module.exports = userController;