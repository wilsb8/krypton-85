const express = require('express');
// const sphp = require('sphp');
const route  = require('../routes/routes');
const app = express();
// serve static content
// app.use(sphp.express('public'));
app.use(express.static('public'));
app.use(express.static('views'));
app.use('/', route);
module.exports = app; 