const sgMail = require("@sendgrid/mail");

const AppError = require("./../utils/AppError");
const User = require("./../models/UserModel");

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.fullName = user.name.split(" ")[0];
    this.url = url;
    this.from = `ElectroBuy Team <${process.env.SENDGRID_EMAIL}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "development") {
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    } else {
      return 1;
    }
  }

  async send(template, subject) {
    // console.log('mf', this.url, this.to);
    // Render the html based on the pug template.
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html,
      text: htmlToText(html),
    };

    // Create a trnasport and send the email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcomeEmail() {
    await this.send("welcomeEmailTemplate", "Welcome to the natours family!");
  }

  async sendResetPasswordEmail() {
    await this.send(
      "resetPasswordEmailTemplate",
      `Your Password Reset Token (Valid for ${
        parseInt(process.env.RESET_PASSWORD_EXPIRY_TIME) / (1000 * 60)
      }) minutes`
    );
  }
}

exports.signup = async (req, res, next) => {
  try {
    const data = await User.create(req.body);
    sgMail.setApiKey(process.env.sendgrid);
    const msg = {
      to: data.email,
      from: {
        name: "MOVIEEX",
        email: "rajakishorbeeravalli@gmail.com",
      },
      subject: "HELLO FROM MOVIEEX",
      text: "welcome ,hope you find what your searching for ,have a nice day,team movieex,Beeravalli Raja Kishor Reddy,ceo",
      html: '<h1>Welcome To movieex</h1><h3>hope you find what are you looking for!</h3><img src="https://i.postimg.cc/G20vfFMt/movieex7.png" alt=:img/><h3>still confused what to watch? Explore movieex for more information!</h3><h4>Team movieex,</h4><h4>Raja Kishor Reddy,</h4><h4>CEO.</h4><h5>contact me if any problem || rajakishorbeeravalli@gmail.com </h5>',
    };
    sgMail.send(msg, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("email sent successful");
      }
    });
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};
