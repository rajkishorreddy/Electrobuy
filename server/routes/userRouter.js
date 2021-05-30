const express = require("express");
const passport = require("passport");

const connectRouter = require("./../routes/connectRoutes");

const authController = require("../controllers/authControllers");
const userController = require("../controllers/userControllers");
const wishlistController = require("../controllers/wishlistControllers");
const cartController = require("../controllers/cartControllers");
const paymentController = require("../controllers/paymentControllers");

const router = express.Router();

// const passportJWTCustomCallback = ()

router.use("/connect", connectRouter);

router.get(
  "/getAuthTokenInfo",
  authController.passportWrapperMiddleware,
  authController.getAuthTokenInfo
);

router.post(
  "/signup-basic",
  authController.passportWrapperMiddleware,
  (req, res, next) => {
    // This returns a error, if the user is trying to connect his google again
    console.log("checking purpose of user", req.user);
    if (req.user && req.user.email) {
      console.log(
        "You have already connected via local method. Please contact admin to change account"
      );
      return res.redirect("http://localhost:3000");
    }
    next();
  },
  authController.basicSignup,
  authController.createCookie
);

router.post(
  "/login-basic",
  authController.passportWrapperMiddleware,
  (req, res, next) => {
    // This returns a error, if the user is trying to connect his google again
    console.log("checking purpose of user", req.user);
    if (req.user && req.user.email) {
      console.log(
        "You have already connected via local method. Please contact admin to change account"
      );
      return res.redirect("http://localhost:3000");
    }
    next();
  },
  authController.basicLogin,
  authController.createCookie
);

router.post("/forgetPassword", authController.basicForgetPassword);
router.patch(
  "/basicResetPassword/:resetToken",
  authController.basicResetPassword,
  authController.createCookie
);

router.get(
  "/getMyProfile",
  authController.passportWrapperMiddleware,
  userController.getProfileInfo
);

router.patch(
  "/updateMyProfilePic",
  authController.passportWrapperMiddleware,
  userController.updateAvatar
);

router.patch(
  "/updateMyProfile",
  authController.passportWrapperMiddleware,
  userController.updateMe
);

router.patch(
  "/updateMyPassword",
  authController.passportWrapperMiddleware,
  userController.updatePassword
);

router.get(
  "/google",
  authController.passportWrapperMiddleware,
  (req, res, next) => {
    // This returns a error, if the user is trying to connect his google again
    console.log("checking purpose of user", req.user);
    if (req.user && req.user.googleId) {
      console.log(
        "You have already connected to google. Please contact admin to change account"
      );
      return res.redirect("http://localhost:3000");
    }
    next();
  },
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);
router.get(
  "/google/redirect",
  (req, res, next) => {
    console.log(
      "the req.params is prior to connecting to google is",
      req.params
    );
    console.log("the req.user is prior to connecting to google is", req.user);
    if (req && req.params && req.params.jwt) {
      req.headers.authorization = `Bearer ${req.params.jwt}`;
      return next();
    }
    next();
  },
  authController.passportWrapperMiddleware,
  passport.authenticate("google", {
    session: false,
    // display: "popup",
    scope: ["profile", "email"],
    failureRedirect: "/",
  }),
  // middleware for sending the cookie back to the browser
  authController.createCookie
);

router.get(
  "/facebook",
  authController.passportWrapperMiddleware,
  (req, res, next) => {
    // This returns a error, if the user is trying to connect his facebook again
    console.log("checking purpose of user", req.user);
    if (req.user && req.user.facebookId) {
      console.log(
        "You have already connected to facebook. Please contact admin to change account"
      );
      return res.redirect("http://localhost:3000");
    }
    next();
  },
  passport.authenticate("facebook", {
    session: false,
    scope: ["profile", "email"],
  })
);
router.get(
  "/facebook/redirect",
  authController.passportWrapperMiddleware,
  passport.authenticate("facebook", {
    session: false,
    // display: "popup",
    scope: ["profile", "email"],
    failureRedirect: "/",
  }),
  // middleware for sending the cookie back to the browser
  authController.createCookie
);

router.get(
  "/github",
  authController.passportWrapperMiddleware,
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
  passport.authenticate("github", {
    session: false,
    scope: ["user:email"],
  })
);
router.get(
  "/github/redirect",
  authController.passportWrapperMiddleware,
  passport.authenticate("github", {
    session: false,
    // display: "popup",
    scope: ["profile", "email"],
    failureRedirect: "/",
  }),
  // middleware for sending the cookie back to the browser
  authController.createCookie
);

router.use(
  "/protected",
  authController.passportWrapperMiddleware,
  (req, res, next) => {
    res.send(req.user);
  }
);

router.get(
  "/getAllWishlistProduct",
  authController.passportWrapperMiddleware,
  wishlistController.getAllWishlistItems
);
router
  .route("/addWishlistProduct/:productId")
  .post(
    authController.passportWrapperMiddleware,
    wishlistController.addWishlistItem
  )
  .delete(
    authController.passportWrapperMiddleware,
    wishlistController.deleteWishlistItem
  );

router.get(
  "/getAllCartProduct",
  authController.passportWrapperMiddleware,
  cartController.getAllCartItems
);
router
  .route("/addCartProduct/:productId")
  .post(authController.passportWrapperMiddleware, cartController.addCartItem)
  .delete(
    authController.passportWrapperMiddleware,
    cartController.deleteCartItem
  );

router.get(
  "/orders",
  authController.passportWrapperMiddleware,
  paymentController.getAllOrders
);

module.exports = router;
