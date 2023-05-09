const express = require('express');
const route  = require('../routes/routes');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require("dotenv").config();
const app = express();


// static directories
app.use(express.static('public'));
app.use(express.static('views'));

// for accepting post from data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// post route
app.post('/send', (req, res) => {
  console.log(req.body);
  const output = `
    <h2>You have a new contact request</h2>
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
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: `${process.env.ID}`,
      pass: `${process.env.PASSWORD}` 
    }
  });

  console.log(`${process.env.ID}`)

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"The Website" <no-reply@seamsovious.com>', // sender address
    to: 'seamsobvious@gmail.com',
    subject: 'A Customer Has Contacted You', // Subject line
    text: 'You have a message from the website!', // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  mailTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.json({ status: 'ERROR', message: 'There was a problem sending your email!' });
      console.log(error);
      setTimeout(() => {
        res.redirect('/');
      }, 2000);
    } else {
      console.log('Email sent: ' + info.response);
      console.log('Message: ' + output)
      console.log('Mail sent!')
      setTimeout(() => {
        res.redirect('/');
      }, 2000);
    }
  });
});


app.use((req, res, next) => {
  if (req.protocol === 'http') {
      return res.redirect(301, `https://${req.headers.host}${req.url}`); // use this to redirect from http to https
  }
  next();
});

app.get('/', route)


module.exports = app; 