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
    let mailTransporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD,
        tls:{
          rejectUnauthorized:false
        }
      }
  });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer Contact" <seamsobvious.no-reply@gmail.com>', // sender address
        to: 'Seams Obvious', 
        subject: 'Node Contact Request', // Subject line
        text: 'You have a message from the website!', // plain text body
        html: output // html body
    };
  
    // send mail with defined transport object
    mailTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.render('sent', { errorMessage: 'There was a problem sending your message. Please try again later.', showErrorMessage: true });
      } else {
        console.log('Email sent: ' + info.response);
        res.render('sent', { successMessage: 'Your message has been sent. Thank you!', showSuccessMessage: true });
      }
    });
    
});

app.use('/', route);


module.exports = app; 