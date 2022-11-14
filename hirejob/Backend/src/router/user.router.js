const express = require('express');

const { listUser, listPorto, listExp, detailUser, detailPorto, detailExp, register, login, updateUser, insertPorto, insertExp, deletePorto, deleteExp, deleteUser, checkEmail, listWorkers, updatePhoto, search } = require('../controller/user.controller');
const { removePorto, removePhoto } = require('../middleware/deleteImg');
const jwtAuth = require('../middleware/jwtAuth');
const { uploadPorto, uploadPhoto } = require('../middleware/uploadImg');

const userRouter = express.Router();

userRouter
.get('/users', listUser)
.get('/user/worker', listWorkers)
.get('/search', search)
.get('/user/portofolio/:id', listPorto)
.get('/user/experience/:id', listExp)
.get('/user/worker/:id', detailUser)
.get('/email/:email', checkEmail)
.get('/portofolio/:id', detailPorto)
.get('/experience/:id', detailExp)
.post('/register', register)
.post('/login', login)
.post('/portofolio', uploadPorto, insertPorto)
.post('/experience', insertExp)
.put('/user/worker/update/:id', updateUser)
.put('/user/photo/:id', removePhoto, uploadPhoto, updatePhoto)
.delete('/user/delete/:id', deleteUser)
.delete('/portofolio/delete/:id', removePorto, deletePorto)
.delete('/experience/delete/:id', deleteExp)

module.exports = userRouter;