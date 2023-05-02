const express = require('express');
const route  = require('../routes/routes');
const app = express();
// static directories
app.use(express.static('public'));
app.use(express.static('views'));

// enable cors
const cors = require("cors");
app.use(cors);



// for accepting post from data
const bodyParser = require("express");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/', route);

module.exports = app; 