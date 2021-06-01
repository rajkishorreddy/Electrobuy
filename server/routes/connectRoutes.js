// This is the page that contains all the routes for users, who want want to expand their profile

const express = require("express");
const passport = require("passport");

const authController = require("./../controllers/authControllers");
const connectController = require("./../controllers/connectControllers");
const User = require("../models/userModel");
const AppError = require("./../utils/AppError");
const Email = require("./../utils/Email");

const router = express.Router();

// Route for connecting the local User with google credentials
router.get(
  "/google/:jwt",
  connectController.addURLParamToHeader,
  authController.passportWrapperMiddleware,
  (req, res, next) => {
    // This returns a error, if the user is trying to connect his github again
    if (req.user && req.user.googleId) {
      console.log(
        "You have already connected to Google. Please contact admin to change account"
      );
      if (process.env.NODE_ENV === "developement") {
        return res.redirect(
          `${process.env.DEVELOPMENT_CLIENT_URL}/getToken/error1`
        );
      } else {
        return res.redirect(
          `${process.env.PRODUCTION_CLIENT_URL}/getToken/error1`
        );
      }
    }
    next();
  },
  (req, res, next) => {
    passport.authenticate(
      "google",
      {
        session: false,
        scope: ["profile", "email"],
        state: req.params.jwt,
      },
      async (err, user, info) => {
        return next();
      }
    )(req, res, next);
  },
  authController.createCookie
);

router.get(
  "/github/:jwt",
  connectController.addURLParamToHeader,
  authController.passportWrapperMiddleware,
  (req, res, next) => {
    // This returns a error, if the user is trying to connect his github again
    if (req.user && req.user.githubId) {
      console.log(
        "You have already connected to Github. Please contact admin to change account"
      );
      if (process.env.NODE_ENV === "developement") {
        return res.redirect(
          `${process.env.DEVELOPMENT_CLIENT_URL}/getToken/error1`
        );
      } else {
        return res.redirect(
          `${process.env.PRODUCTION_CLIENT_URL}/getToken/error1`
        );
      }
    }
    next();
  },
  (req, res, next) => {
    passport.authenticate(
      "github",
      {
        session: false,
        scope: ["profile", "email"],
        state: req.params.jwt,
      },
      async (err, user, info) => {
        return next();
      }
    )(req, res, next);
  },
  authController.createCookie
);

//NOTE: NO SUPPORT FOR FACEBOOK

module.exports = router;
