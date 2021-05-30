// This is the page that contains all the routes for users, who want want to expand their profile

const express = require("express");
const passport = require("passport");

const authController = require("./../controllers/authControllers");
const User = require("./../models/UserModel");
const AppError = require("./../utils/AppError");

const router = express.Router();

router.use(authController.passportWrapperMiddleware);

// Route for connecting the local User with google credentials
router.get(
  "/google",
  (req, res, next) => {
    console.log(
      "the req.user prior to connecting with other acc is ",
      req.user
    );
    next();
  },
  (req, res, next) => {
    // This returns a error, if the user is trying to connect his github again
    if (req.user && req.user.googleId) {
      console.log(
        "You have already connected to Google. Please contact admin to change account"
      );
      return res.redirect("http://localhost:3000");
    }
    next();
  },
  passport.authorize("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

router.get(
  "/github",
  (req, res, next) => {
    console.log(
      "the req.user prior to connecting with other acc is ",
      req.user
    );
    next();
  },
  (req, res, next) => {
    // This returns a error, if the user is trying to connect his github again
    if (req.user && req.user.githubId) {
      console.log(
        "You have already connected to Github. Please contact admin to change account"
      );
      return res.redirect("http://localhost:3000");
    }
    next();
  },
  passport.authorize("github", {
    session: false,
    scope: ["user:email"],
  })
);

router.get(
  "/local",
  (req, res, next) => {
    console.log(
      "the req.user prior to connecting with other acc is ",
      req.user
    );
    next();
  },
  (req, res, next) => {
    // Assuming that this route is only called in the case, where the user is already authenticated via
    // google of github, and now wants to add his local auth details
    if (req.user && req.user.email) {
      console.log(
        "You have already connected via local method. Please contact admin to change account"
      );
      return res.redirect("http://localhost:3000");
    }
    next();
  },
  (req, res, next) => {
    //BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:
    //NOTE: Need to connect with the new email and password to the existing account
  }
);

module.exports = router;
