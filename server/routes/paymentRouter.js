const express = require("express");
const paymentController = require("./../controllers/paymentControllers");
const authController = require("./../controllers/authControllers");

const router = express.Router();

// This route is accessed with certain body attached
// email => not ther
// transactionAmount
router.post(
  "/",
  authController.passportWrapperMiddleware,
  paymentController.initiateTransaction
);

router.post(
  "/redirect",
  authController.passportWrapperMiddleware,
  paymentController.verifyTransaction
);
module.exports = router;
