const nodemailer = require("nodemailer");
const Handlebars = require("handlebars");
const hbs = require('nodemailer-express-handlebars');
const path = require('path')

const transport = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    }
});

const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve('./utils/email/views'),
      defaultLayout: false,
    },
    viewPath: path.resolve('./utils/email/views'),
    extName: ".handlebars",
}

transport.use('compile', hbs(handlebarOptions));

const privacyPolicyLink = "http://localhost:5173/privacy-policy"
const termsOfServicesLink = "http://localhost:5173/terms-of-service"
const contactUsLink = "http://localhost:5173/contact-us"
const homeLink = "http://localhost:5173"


// send a verification email to the user
async function sendVerificationEmail(email, verificationToken) {


    const verificationLink = `http://localhost:5173/auth/confirmed-email/${verificationToken}`;

    var mailOptions = {
        from: 'support@inventos.com',
        to: email,
        subject: 'Verify your email address',
        template: 'confirm-email',
        context: {
            verificationLink: verificationLink,
            privacyPolicyLink:privacyPolicyLink,
            termsOfServicesLink:termsOfServicesLink,
            contactUsLink:contactUsLink,
            homeLink:homeLink
        }
      
    };
  
    
    await transport.sendMail(mailOptions);
}


//export the modules to be used anywhere
module.exports = { sendVerificationEmail };
