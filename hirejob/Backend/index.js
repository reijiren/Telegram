require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const userRouter = require('./src/router/user.router');
const recRouter = require('./src/router/recruiter.router');

const app = express();

try{
    app.use(express.static("assets"));
	app.use(helmet());
	app.use(bodyParser.json());
	app.use(xss());
	app.use(cors());
	app.use(userRouter);
	app.use(recRouter);
}catch(err) {
    console.error(err);
}

app.listen(process.env.PORT, () => {
	console.log("SERVICE IS RUNNING ON PORT 3001");
});