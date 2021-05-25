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

router.post(
  "/signup-basic",
  authController.basicSignup,
  authController.createCookie
);

router.post(
  "/login-basic",
  authController.basicLogin,
  authController.createCookie
);

router.post("/forgetPassword", authController.basicForgetPassword);
router.patch(
  "/basicResetPassword/:resetToken",
  authController.basicResetPassword,
  authController.createCookie
);

router.patch(
  "/updateMyPassword",
  authController.passportWrapperMiddleware,
  userController.updatePassword
);

router.get(
  "/google",
  (req, res, next) => {
    console.log("called from 1st call");
    next();
  },
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);
router.get(
  "/google/redirect",
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

router.get("/checkOrder/:orderId", paymentController.checkOrder);

module.exports = router;
