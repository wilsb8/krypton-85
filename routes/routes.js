const express = require("express");
const router = express.Router();
const path = require("path");
const nodemailer = require('nodemailer');
const reqPath = path.join(__dirname); 


router.get('/', (req, res) => {
    console.log(reqPath);
    res.sendFile(path.join(reqPath, 'views/index.html'));
});

router.post('/send', (req, res) => {
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Subject: ${req.body.subject}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;
  
    // create reusable transporter object using the default SMTP transport
    let mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'seamsobvious@gmail.com',
          pass: 'Csewalt2023'
      }
  });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer Contact" <seamsobvios@gmail.com>', // sender address
        to: 'RECEIVEREMAILS', // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.json({ status: 'error-message', message: 'There was a problem sending your message. Please try again later.' });
      } else {
        console.log('Email sent: ' + info.response);
        res.json({ status: 'sent-message', message: 'Your message has been sent. Thank you!' });
      }
    });
  });



module.exports = router;