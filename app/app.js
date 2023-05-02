const express = require('express');
const sphp = require('sphp');
const route  = require('../routes/routes');
const app = express();
// serve static content
app.use(express.static('public'));
// for php
app.use(sphp.express('public/forms'));
// 
app.use(express.static('views'));
app.use('/', route);
module.exports = app; 