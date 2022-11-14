const express = require('express');

const { listRecruits, detailUser, update } = require('../controller/recruiter.controller');
const {} = require('../middleware/deleteImg');
const { isRecruiter } = require('../middleware/auth')
const jwtAuth = require('../middleware/jwtAuth');
const {} = require('../middleware/uploadImg');

const recRouter = express.Router();

recRouter
.get('/user/recruiter', listRecruits)
.get('/user/recruiter/:id', detailUser)
.put('/user/recruiter/update/:id', update)

module.exports = recRouter;