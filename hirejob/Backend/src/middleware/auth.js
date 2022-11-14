const { failed } = require('../helper/response');

module.exports = {
    isWorker: (req, res, next) => {
        if(req.APP_DATA.tokenDecode.type === 0){
            next();
        }else{
            failed(res, null, 'failed', 'Recruiter is not allowed to do that');
        }
    },

    isRecruiter: (req, res, next) => {
        if(req.APP_DATA.tokenDecode.type === 1){
            next();
        }else{
            failed(res, null, 'failed', 'Worker is not allowed to do that');
        }
    },
}