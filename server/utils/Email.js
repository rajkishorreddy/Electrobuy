const util = require("util");

const sgMail = require("@sendgrid/mail");

const AppError = require("./AppError");
const User = require("../models/userModel");

class Email {
  constructor(user, url = "null") {
    //NOTE: Please change the email address
    this.to = "solipuram42@gmail.com";
    this.name = user.name;
    this.url = url;
    this.from = `ElectroBuy Team <${process.env.SENDGRID_EMAIL}>`;
  }

  async send(subject, text) {
    // const response = await util.promisify(sgMail.send)(msg);
    // console.log('mf', this.url, this.to);

    // Define email options
    console.log("process.env.SENDGRID_KEY", process.env.SENDGRID_KEY);
    sgMail.setApiKey(process.env.SENDGRID_KEY);
    const mailOptions = {
      to: this.to,
      from: {
        name: "ELECTROBUY",
        email: process.env.SENDGRID_EMAIL,
      },
      subject,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <title></title>
        <style type="text/css" rel="stylesheet" media="all">
          /* Base ------------------------------ */
    
          @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
          body {
            width: 100% !important;
            height: 100%;
            margin: 0;
            -webkit-text-size-adjust: none;
          }
    
          a {
            color: #3869d4;
            text-decoration: none;
          }
          a:hover{
            text-decoration: underline;
          }
    
          a img {
            border: none;
          }
    
          td {
            word-break: break-word;
          }
          
          /* Type ------------------------------ */
    
          body,
          td,
          th {
            font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
          }
    
          h1 {
            margin-top: 0;
            font-size: 22px;
            font-weight: bold;
            text-align: left;
          }
    
          td,
          th {
            font-size: 16px;
          }
    
          /* Utilities ------------------------------ */
    
          .align-right {
            text-align: right;
          }
    
          .align-left {
            text-align: left;
          }
    
          .align-center {
            text-align: center;
          }
          /* Buttons ------------------------------ */
    
          .button {
            font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
            font-weight: 500;
            font-style: normal;
            font-size: 15px;
            padding: 10px 20px;
            background-color: rgba(0, 0, 0, 0.521);
            color: white !important;
            border: none;
            cursor: pointer;
            margin: 0 10px;
            text-decoration: none;
          }
    
          /* .button--green {
            background-color: #22bc66;
            border-top: 10px solid #22bc66;
            border-right: 18px solid #22bc66;
            border-bottom: 10px solid #22bc66;
            border-left: 18px solid #22bc66;
          }
    
          .button--red {
            background-color: #ff6136;
            border-top: 10px solid #ff6136;
            border-right: 18px solid #ff6136;
            border-bottom: 10px solid #ff6136;
            border-left: 18px solid #ff6136;
          } */
    
          body {
            background: linear-gradient(180deg, #74f062 0%, #2e2e2e 0.01%, rgba(88, 30, 122, 0.79) 100%);
            color: #51545e;
          }
    
          p {
            color: #51545e;
          }
    
          p.sub {
            color: #6b6e76;
          }
    
          .email-wrapper {
            width: 100%;
            margin: 0;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
          }
    
          .email-content {
            width: 100%;
            margin: 0;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
          }
          /* Masthead ----------------------- */
    
          .email-masthead {
            padding: 25px 0;
            text-align: center;
          }
    
          .email-masthead_logo {
            width: 94px;
          }
    
          .email-masthead_name {
            font-size: 16px;
            font-weight: bold;
            color: #a8aaaf;
            text-decoration: none;
            text-shadow: 0 1px 0 white;
          }
          /* Body ------------------------------ */
    
          .email-body {
            width: 100%;
            margin: 0;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
          }
    
          .email-body_inner {
            width: 570px;
            margin: 0 auto;
            padding: 0;
            -premailer-width: 570px;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
          }
    
          .email-footer {
            width: 570px;
            margin: 0 auto;
            padding: 0;
            -premailer-width: 570px;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            text-align: center;
          }
    
          .email-footer p {
            color: #6b6e76;
          }
    
          .body-action {
            width: 100%;
            margin: 30px auto;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            text-align: center;
          }
    
          .body-sub {
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px solid #eaeaec;
          }
    
          .content-cell {
            padding: 35px;
          }
          /*Media Queries ------------------------------ */
    
          @media only screen and (max-width: 600px) {
            .email-body_inner,
            .email-footer {
              width: 100% !important;
            }
          }
    
          body,
          .email-body,
          .email-body_inner,
          .email-content,
          .email-wrapper,
          .email-masthead,
          .email-footer {
            color: #fff !important;
          }
          p,
          ul,
          ol,
          blockquote,
          h1,
          h2,
          h3,
          span,
          .purchase_item {
            color: #fff !important;
          }
          .attributes_content,
          .discount {
            background-color: #222 !important;
          }
          .email-masthead_name {
            text-shadow: none !important;
          }
          .fontsmall{
            font-size: 14px;
          }

          .padding-1{
            padding:20px 10px;
          }
          .padding-2{
            padding-bottom: 20px;
          }
        </style>
        <!--[if mso]>
          <style type="text/css">
            .f-fallback {
              font-family: Arial, sans-serif;
            }
          </style>
        <![endif]-->
      </head>
      <body style="background: linear-gradient(180deg, #74f062 0%, #2e2e2e 0.01%, rgba(88, 30, 122, 0.79) 100%);color:white">
        <table
          class="email-content"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
        >
          <tr>
            <td class="email-masthead">
              <img src=${process.env.SENDGRID_IMAGE} alt="Group-57" border="0" />
            </td>
          </tr>
          <!-- Email Body -->
          <tr>
            <td class="content-cell" align="center">
              <h1 class="align-left">${text}</h1>
              <a
                href=${this.url}
                class="f-fallback button"
                target="_blank"
                >Do this Next</a
              >
              
            </td>
          </tr>
          <tr>
            <td class="content-cell" style="padding-bottom: 0;" align="center">
              <p style="font-size: 14px;" class="align-left">
                Thank you for shopping with ElectroBuy! &emsp;
                Got Questions? Feel free to <a href="https://www.youtube.com/">contact us</a></p>
            </td>
          </tr>
          <tr>
            <td class="content-cell" align="center">
              <p class="f-fallback sub align-center">
                &copy; 2021 ElectroBuy. All rights reserved.
              </p>
              <p class="f-fallback sub align-center">
                Made with ❤ by <a href="https://www.youtube.com/" target="_blank">Devs</a>
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>

`,
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
