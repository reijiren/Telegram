const recModel = require('../model/recruiter.model');
const { success, failed } = require('../helper/response');

const recController = {
    // get all recruiters
    listRecruits: (req, res) => {
        recModel.selectRecruiters()
        .then((result) => {
            success(res, result.rows, 'success', 'get all recruiters success');
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'failed to get all recruiters');
        })
    },

    // get detail user
    detailUser: (req, res) => {
        const id = req.params.id;

        recModel.selectRecruitersId(id)
        .then((result) => {
            success(res, result.rows, 'success', `get detail recruiter success`);
        })
        .catch((err) => {
            failed(res, err.message, 'failed', `failed to get recruiter detail`);
        })
    },

    // update recruiter
    update: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        const newPass = body.password ? bcrypt.hashSync(body.password, 10) : null;

        recModel.updateRecruiters(id, body, newPass)
        .then((result) => {
            success(res, result.rowCount, "success", "update user success");
        })
        .catch((err) => {
            failed(res, err.message, "failed", "failed to update user");
        });
    },
}

module.exports = recController;