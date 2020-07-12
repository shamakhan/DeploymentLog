"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var express = require("express");
var app = express();
app.get('/', function (req, res) {
    res.send('Hello');
});
app.listen(process.env.APP_PORT, function () {
    console.log("App running at " + process.env.APP_URL + ":" + process.env.APP_PORT);
});
