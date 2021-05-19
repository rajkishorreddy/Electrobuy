const express = require("express");
const formidable = require("formidable");
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
router.post("/redirect", (req, res, next) => {
  console.log("yo bitch");
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, file) => {
    console.log(fields);
    // res.redirect("http://127.0.0.1:3000/");
  });
});
module.exports = router;
