const util = require("util");

const sgMail = require("@sendgrid/mail");

const AppError = require("./AppError");
const User = require("../models/userModel");

class Email {
  constructor(user, url = "null") {
    //NOTE: Please change the email address
    this.to = "sujayjami99999@gmail.com";
    this.name = user.name;
    this.url = url;
    this.from = `ElectroBuy Team <${process.env.SENDGRID_EMAIL}>`;
  }

  async send(subject, text) {
    // const response = await util.promisify(sgMail.send)(msg);
    // console.log('mf', this.url, this.to);

    // Define email options
    sgMail.setApiKey(process.env.SENDGRID_KEY);
    const mailOptions = {
      to: this.to,
      from: {
        name: "ELECTROBUY",
        email: process.env.SENDGRID_EMAIL,
      },
      subject,
      html: `<h1><img src=${process.env.SENDGRID_IMAGE} alt="Group-57" border="0"></img><h3>${text}</h3><h5>From Team ELECTROBUY</h5></h1>`,
    };

    // Create a trnasport and send the email
    await sgMail.send(mailOptions);
  }

  async sendWelcomeEmail() {
    await this.send(
      "Welcome To ELECTROBUY",
      "Welcome to the ElectroBuy family!. We hope that you find what you are searching for. HAPPY SHOPPING !"
    );
  }

  async sendResetPasswordEmail() {
    console.log(this.url);
    await this.send(
      "Reset Password Email",
      `Your Password Reset Token (Valid for ${
        parseInt(process.env.RESET_PASSWORD_EXPIRY_TIME) / (1000 * 60 * 60)
      }) hours is ${this.url}`
    );
  }

  async successOrder() {
    await this.send(
      "Order Successfull",
      `Your Order has been successfully placed. To view your orders, please click here.`
    );
  }
}

module.exports = Email;
