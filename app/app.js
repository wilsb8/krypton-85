const express = require('express');
const route  = require('../routes/routes');
const app = express();
app.use(express.static('public'));
app.use(express.static('views'));
app.use('/', route);

module.exports = app; 