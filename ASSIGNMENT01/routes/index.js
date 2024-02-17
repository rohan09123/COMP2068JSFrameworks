const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/about', function(req, res, next) {
  res.render('about' , { title: 'About'});
})

router.get('/projects', function(req, res, next) {
  res.render('projects' , { title: 'My Projects'});
})

router.get('/contact', function(req, res, next) {
  res.render('contact' , { title: 'Contact Me'});
})

router.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'rohansv1604@gmail.com',
          pass: 'qoer igvp qgzz pchu'
      }
  });

  const mailOptions = {
      from: 'rohansv1604@gmail.com',
      to: 'rohansv1604@gmail.com',
      subject: subject,
      text: `Hello my name is ${name}\n My email is: ${email}\n\nThis message is regarding\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          res.send('Error sending email');
      } else {
          res.render('index', { title: 'Home' });
      }
  });
});

module.exports = router;
