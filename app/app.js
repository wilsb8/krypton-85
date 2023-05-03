const express = require('express');
const route  = require('../routes/routes');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

// static directories
app.use(express.static('public'));
app.use(express.static('views'));

// for accepting post from data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// send route
app.post('/send', (req, res) => {
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
    var mailTransporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "e6d2eb0325ba50",
        pass: "191168b8a27666"
      }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer Contact Form" <no-reply@seamsovious.com>', // sender address
        to: 'seamsobvious@gmail.com', 
        subject: 'Node Contact Request', // Subject line
        text: 'You have a message from the website!', // plain text body
        html: output // html body
    };
  
    // send mail with defined transport object
    mailTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.json({ status: 'error-message', message: 'There was a problem sending your message. Please try again later.' });
      } else {
        console.log('Email sent: ' + info.response);
        console.log('Message: ' + output)
        res.json({ status: 'sent-message', message: 'Your message has been sent. Thank you!' });
        }
    });
});

app.use('/', route);


module.exports = app; 