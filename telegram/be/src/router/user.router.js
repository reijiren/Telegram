const express = require('express');

const { list, detail, register, login, update } = require('../controller/user.controller');

const userRouter = express.Router();

userRouter
.get('/users', list)
.get('/user/:id', detail)
.post('/register', register)
.post('/login', login)
.put('/user/update/:id', update)

module.exports = userRouter;