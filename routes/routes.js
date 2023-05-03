const express = require("express");
const router = express.Router();
const path = require("path");
const reqPath = path.join(__dirname); 


router.get('/', (req, res) => {
    console.log(reqPath);
    res.sendFile(path.join(reqPath, 'views/index.handlebars'));
});


module.exports = router;