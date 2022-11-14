// declare library
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const xss = require("xss-clean");

const userApp = require('./src/router/user.router');

const app = express();

try {
	app.use(express.static("assets"));
	app.use(helmet());
	app.use(bodyParser.json());
	app.use(xss());
	app.use(cors());
	app.use(userApp);
} catch (err) {
	console.log(err);
}

// jalankan express
app.listen(process.env.PORT, () => {
	console.log("SERVICE IS RUNNING ON PORT " + process.env.PORT);
});