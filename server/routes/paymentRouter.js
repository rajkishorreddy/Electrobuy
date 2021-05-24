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
    // res.status(200).json("ok working");
    res.redirect("https://unruffled-swanson-043fa8.netlify.app/cart");
  });
});
module.exports = router;
