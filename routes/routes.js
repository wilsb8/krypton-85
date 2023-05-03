const express = require("express");
const router = express.Router();
const path = require("path");
const nodemailer = require('nodemailer');
const reqPath = path.join(__dirname); 


router.get('/', (req, res) => {
    console.log(reqPath);
    res.sendFile(path.join(reqPath, 'views/index.html'));
});





module.exports = router;