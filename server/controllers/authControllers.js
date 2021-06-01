const crypto = require("crypto");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const User = require("../models/UserModel");
const AppError = require("../utils/AppError");
const Email = require("./../utils/Email");

exports.basicSignup = async (req, res, next) => {
  // This middleware is responsible for creating a new user in the db
  // As soon as the user is created, we can redirect him back to the login page
  // NOTE: In this middleware, we are not sending back the token to the browser
  try {
    //1) Check for all the feilds that are required in this middleware
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.password ||
      !req.body.confirmPassword
    ) {
      return next(new AppError(400, "Please provide the proper inputs"));
    }

    //3)create a new user in the DB
    //we must always signup a new user only as an default i.e user. an user can be changed to admin in db
    // This user passes though all the pre save hooks
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      avatar: req.body.avatar,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    // 3) Since we are creating a document, rather than reading from the DB, the select field doesnt work
    // so we must manually, set caertain feilds to undefined
    newUser.password = undefined;
    newUser.active = undefined;

    //3) Send a welcome email to the user email
    // const url = `${req.protocol}://${req.get("host")}/me`;
    try {
      let emailStatus;
      if (process.env.NODE_ENV === "development") {
        emailStatus = await new Email(
          newUser,
          process.env.DEVELOPMENT_CLIENT_URL
        ).sendWelcomeEmail();
      } else if (process.env.NODE_ENV === "production") {
        emailStatus = await new Email(
          newUser,
          process.env.PRODUCTION_CLIENT_URL
        ).sendWelcomeEmail();
      }
      console.log("emailStatus is ", emailStatus);
    } catch (err) {
      console.log(err);
    }

    //4)pass onto the next middlware which send back the token and the response
    // Inorder tosend the info to the next middleware, i will attach a property to the req object
    console.log("the new user is ", newUser);
    req.cookieInfoProperty = { user: newUser, provider: "local" };

    return next();
  } catch (err) {
    next(err);
  }
};

exports.basicLogin = async (req, res, next) => {
  // This middleware is responsible for logging in the user  with the email and the password provided
  // and adding it to the req.cookieInfoProperty
  try {
    //1)we need to get the email and password details from the user
    const { email, password } = req.body;

    //2)check whther the email and the password are present
    if (!email || !password) {
      return next(new AppError(400, "Please provide an email and a password."));
    }

    //3)if good, check whether the user exists in the db only based on the email
    //   we must also explicitly add the password feild to returned doc, as the select field is set to false
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(
        new AppError(400, "Please provide the valid username and password.")
      );
    }

    if (!user.password) {
      return next(
        new AppError(
          400,
          "Please connect your account with basic auth method, to use this basic method"
        )
      );
    }

    //4)if good, check whether the password provided is correct.this functionality is already present as an
    //  instance to the user model
    //if the functions returns false. then we must return a error, where the password is the plain password
    //and the user.password is the hashed password saved in the db
    const checkPasswordBool = await user.checkPassword(password, user.password);
    if (!checkPasswordBool) {
      return next(
        new AppError(401, "Please provide the valid username and password.")
      );
    }

    //5)pass onto the next middlware which send back the token and the response
    // Inorder tosend the info to the next middleware, i will attach a property to the req object
    req.cookieInfoProperty = { user: user, provider: "local" };

    return next();
  } catch (err) {
    next(err);
  }
};

exports.basicForgetPassword = async (req, res, next) => {
  // This middleware is responsible for creating a reset token and sending it to the email(or as a response for now)
  try {
    // 1) Get the email address from the body
    const { email } = req.body;
    if (!email) {
      return next(new AppError(400, "Please provide the email address"));
    }

    // 1) Validate the email address
    if (!validator.isEmail(email)) {
      return next(new AppError(400, "Please provide a valid email address"));
    }

    // 2) Get the user from the DB
    const lostUser = await User.findOne({ email }).select("+password");
    if (!lostUser) {
      return next(
        new AppError(
          400,
          "There is no Active user based on the given email address"
        )
      );
    }

    // 3) Check if we have the password feild, then only we can really use to set the new passowrd,
    // or else, we need to ask to intially connect to other auth methods
    if (!lostUser.password) {
      return next(
        new AppError(
          400,
          "Please connect your account with basic auth method, to use this basic method"
        )
      );
    }

    // 3) If the user is present, then create a token of certain validity and send back the token
    const resetToken = lostUser.createPasswordResetToken();
    console.log("reset token", resetToken);

    // 4) Save the lostUser containing the newly created feilds i.e. validity and the hashed version of the token
    // We need to turn off the validations, that are present on the document itself
    // NOTE: Here the updated user is only a addition to the lostuser, it doesnt read  a new document from DB
    const updatedUser = await lostUser.save({ validateBeforeSave: false });
    updatedUser.password = undefined;

    try {
      let emailStatus;
      if (process.env.NODE_ENV === "development") {
        emailStatus = await new Email(
          updatedUser,
          process.env.DEVELOPEMENT_RESET_PASSWORD_URL.replace(
            "<RESETTOKEN>",
            resetToken
          )
        ).sendResetPasswordEmail();
      } else if (process.env.NODE_ENV === "production") {
        emailStatus = await new Email(
          updatedUser,
          process.env.PRODUCTION_RESET_PASSWORD_URL.replace(
            "<RESETTOKEN>",
            resetToken
          )
        ).sendResetPasswordEmail();
      }
      console.log("emailStatus is ", emailStatus);
    } catch (err) {
      console.log(err);
    }

    // NOTE: The reset token must be only ssent through the email
    // 5) Send back the reset token for now
    res.status(200).json({
      status: "success",
      data: {
        token: resetToken,
        curentUser: updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.basicResetPassword = async (req, res, next) => {
  // This middleware is responsible for verifying the resetToken provided and update with the password provided
  // in the body
  try {
    // 1) Get the reset token and verify it
    const { resetToken } = req.params;
    // console.log(resetToken);
    // The resettoken only conatins the random string, we need to hash it prior ot checking it in the db
    const hashedResetTokenAnother = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    // console.log("hashedResetTokenAnother is", hashedResetTokenAnother);
    const verifiedUser = await User.findOne({
      passwordResetToken: hashedResetTokenAnother,
      passwordResetTokenExpiryTime: { $gte: Date.now() },
    });

    console.log(verifiedUser);
    if (!verifiedUser) {
      return next(new AppError(404, "The token is not valid or has expired."));
    }

    //3)update the password and confirmPassword feild
    verifiedUser.password = req.body.password;
    verifiedUser.confirmPassword = req.body.confirmPassword;
    verifiedUser.passwordResetToken = undefined;
    verifiedUser.passwordResetTokenExpiryTime = undefined;

    //4)update the changedPasswordAt property of the user
    //  for this, we added a new pre save hook, that always updates the changedPasswordAt property duly
    const updatedUser = await verifiedUser.save();
    console.log("the updated user with new password is", updatedUser);
    updatedUser.password = undefined;

    //5)pass onto the next middlware which send back the token and the response
    // Inorder tosend the info to the next middleware, i will attach a property to the req object
    req.cookieInfoProperty = { user: updatedUser, provider: "local" };

    return next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createCookie = (req, res, next) => {
  // This middleware is responsible for creating the token, and sending back a response
  // The data from the prev middleware comes as req.user
  if (!req.user && !req.cookieInfoProperty) {
    return next(new Error(401, "there is no prior info for creating a cookie"));
    // return next();
  }

  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRY_TIME),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  };

  const cookieInfo = req.cookieInfoProperty || req.user;

  // Here, we assume that the user information is present at req.user
  // We need to send back the _id of the user from our DB
  console.log("The user from createCookie fn", cookieInfo);

  // NOTE: We need to send the _id property of the user from the DB
  const jwtToken = jwt.sign(
    { _id: cookieInfo.user._id, provider: cookieInfo.provider },
    process.env.JWT_SECRET
  );
  //3)sending back the response
  console.log(
    "The cookie info prior to sending response or redirecting",
    cookieInfo
  );
  res.cookie("jwt", jwtToken, cookieOptions);
  if (cookieInfo.provider === "google" || cookieInfo.provider === "github") {
    if (process.env.NODE_ENV === "developement") {
      return res.redirect(
        `${process.env.DEVELOPMENT_CLIENT_URL}/getToken/${jwtToken}`
      );
    } else {
      return res.redirect(
        `${process.env.PRODUCTION_CLIENT_URL}/getToken/${jwtToken}`
      );
    }
  } else {
    res.status(200).json({
      status: "success",
      jwtToken,
      data: {
        user: cookieInfo.user,
        provider: cookieInfo.provider,
      },
    });
  }
};

exports.getAuthTokenInfo = (req, res, next) => {
  if (!req.user) {
    return next(new AppError(400, "Please log in again"));
  }
  // As the token is present on the req.user if the user is authenticated
  const availableMethodstoConnect = [];
  if (!req.user.googleId) {
    availableMethodstoConnect.push("google");
  }
  // if (!req.user.email) {
  //   availableMethodstoConnect.push("local");
  // }
  if (!req.user.githubId) {
    availableMethodstoConnect.push("github");
  }
  if (!req.user.facebookId) {
    availableMethodstoConnect.push("facebook");
  }

  res.status(200).json({
    status: "success",
    data: availableMethodstoConnect,
  });
};

exports.passportWrapperMiddleware = (req, res, next) => {
  // NOTE: Need to add more security for checking the cookie
  passport.authenticate(
    "jwt",
    { session: false },
    async (err, jwtPayload, info) => {
      try {
        // Here, the data passed only is the decoded payload.
        if (err) {
          console.log(err);
          return next(err);
        }
        if (!jwtPayload) {
          console.log(
            "there is no user logged in intailly, so passing onto next middleware"
          );
          return next();
        }
        let verifiedUser;
        // 1) Get the decoded payload value from the cookie
        // console.log("jwtpayload extracted is", jwtPayload);

        // 2) If the provider is google, verify if the verifiedUser really exists in the DB, and add it
        // directly to the verifiedUser
        if (jwtPayload.provider === "google") {
          verifiedUser = await User.findById(jwtPayload._id);

          if (!verifiedUser) {
            return next(
              new AppError(
                400,
                "User not found based on the cookie provided. Please log in again"
              )
            );
          }
          req.user = verifiedUser;
          // console.log("the user added to the req", req.user);
          return next();
        }
        // 2) If the provider is github, verify if the verifiedUser really exists in the DB, and add it
        // directly to the verifiedUser
        if (jwtPayload.provider === "github") {
          verifiedUser = await User.findById(jwtPayload._id);

          if (!verifiedUser) {
            return next(
              new AppError(
                400,
                "User not found based on the cookie provided. Please log in again"
              )
            );
          }
          req.user = verifiedUser;
          // console.log("the user added to the req", req.user);
          return next();
        }
        // 3) If the provider is the local strategy, veify the verifiedUser and also check for the password
        // property, and make sure that the token provided is valid
        if (jwtPayload.provider === "local") {
          verifiedUser = await User.findById(jwtPayload._id);
          if (!verifiedUser) {
            return next(
              new AppError(
                400,
                "User not found based on the cookie provided. Please log in again"
              )
            );
          }
          // check if the password has been changed
          // this might be the case when the jwt is extracted and used with another user -- very imp
          if (verifiedUser.checkPasswordChangedAtProperty(jwtPayload.iat)) {
            next(
              new AppError(
                401,
                "The password has been changed, Please log in again."
              )
            );
          }
          req.user = verifiedUser;
          // console.log("the user added to the req", req.user);
          return next();
        }
      } catch (error) {
        next(error);
      }
    }
  )(req, res, next);
};
