const util = require("util");

const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const formidable = require("formidable");
const formidableMiddleware = require("express-formidable");

const Product = require("./../models/productModel");
const User = require("../models/userModel");
const Booking = require("./../models/bookingModel");
const PaytmChecksum = require("./../utils/PaytmChecksum");
const AppError = require("./../utils/AppError");
const Email = require("./../utils/Email");

exports.initiateTransaction = async (req, res, next) => {
  try {
    // 1) Make sure that the user is logged in
    if (!req.user) {
      return next(new AppError(401, "Please log in again"));
    }

    // 2) Get the total amount and the email from the req.body
    let { transactionAmount, transactionGoods } = req.body;

    // Make sure to conver the integer value to the string
    transactionAmount = JSON.stringify(transactionAmount);
    transactionGoods = JSON.stringify(transactionGoods);
    console.log(transactionGoods);
    // transactionGoods = transactionGoods.map((good) => {
    //   return {
    //     merchantGoodsId: good,
    //   };
    // });

    console.log("the goods are ", transactionGoods);
    // console.log(
    //   "the goods are ",
    //   transactionGoods.map((el) => JSON.stringify(el))
    // );

    // 3) Get all the details required for the transaction
    let paytmTransactionParams = {};

    // Make sure to add the details to the body of the obj
    paytmTransactionParams.body = {
      requestType: "Payment",
      mid: process.env.PAYTM_MERCHANT_ID,
      websiteName: process.env.PAYTM_WEBSITE_NAME,
      orderId: uuidv4(),
      callbackUrl: `${process.env.PAYTM_CALLBACK_URL}?userId=${req.user._id}&products=${transactionGoods}`,

      txnAmount: {
        value: transactionAmount,
        currency: "INR",
      },
      userInfo: {
        custId: req.user._id,
        email: req.user.email,
        firstName: req.user.name.split(" ")[0],
        lastName: req.user.name.split(" ")[1],
      },
    };
    console.log(paytmTransactionParams);
    const paytmChecksumResultHash = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmTransactionParams.body),
      process.env.PAYTM_MERCHANT_KEY
    );

    console.log("cjeck this", paytmChecksumResultHash);
    paytmTransactionParams.head = {
      signature: paytmChecksumResultHash,
    };

    const transactionResponse = await axios({
      url: `https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MERCHANT_ID}&orderId=${paytmTransactionParams.body.orderId}`,
      method: "POST",
      data: paytmTransactionParams,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": JSON.stringify(paytmTransactionParams).length,
        Accept: "/",
      },
    });

    paytmTransactionParams.head = {
      txnToken: transactionResponse.data.body.txnToken,
    };

    //NOTE: change the error handling
    if (transactionResponse.data.body.resultInfo.resultStatus !== "S") {
      console.log(transactionResponse.data.body.resultInfo);
      return next(new AppError(400, "Some internal error"));
    }
    res.status(200).json({
      status: "success",
      data: {
        result: transactionResponse.data.body.resultInfo,
        mid: paytmTransactionParams.body.mid,
        orderId: paytmTransactionParams.body.orderId,
        txnToken: paytmTransactionParams.head.txnToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyTransaction = async (req, res, next) => {
  try {
    let newPaytmTransactionParams = {};
    let paytmCheckSum;
    const incomingForm = new formidable.IncomingForm();

    incomingForm.encoding = "utf-8";
    var formfields = await new Promise(function (resolve, reject) {
      incomingForm.parse(req, function (err, fields, files) {
        if (err) {
          reject(err);
          return;
        }

        resolve(fields);
      });
    });
    console.log(formfields);
    // console.log(formfields.CHECKSUMHASH);
    paytmCheckSum = formfields.CHECKSUMHASH;
    delete formfields.CHECKSUMHASH;
    newPaytmTransactionParams = formfields;
    // console.log(newPaytmTransactionParams);
    // console.log("idkk", process.env.PAYTM_MERCHANT_KEY);

    const isVerifySignature = await PaytmChecksum.verifySignature(
      newPaytmTransactionParams,
      process.env.PAYTM_MERCHANT_KEY,
      paytmCheckSum
    );
    if (!isVerifySignature) {
      return res.redirect(
        `http://localhost:3000/conformation/${newPaytmTransactionParams.ORDERID}`
      );
    }

    const newParamsBody = {
      mid: newPaytmTransactionParams.MID,
      orderId: newPaytmTransactionParams.ORDERID,
    };
    const paytmChecksumResultHash = await PaytmChecksum.generateSignature(
      JSON.stringify(newParamsBody),
      process.env.PAYTM_MERCHANT_KEY
    );

    const checkTransactionStatus = await axios({
      method: "post",
      url: `https://securegw-stage.paytm.in/v3/order/status`,
      data: {
        head: { signature: paytmChecksumResultHash },
        body: {
          mid: newPaytmTransactionParams.MID,
          orderId: newPaytmTransactionParams.ORDERID,
        },
      },
    });
    console.log("final stuff is ", checkTransactionStatus.data);

    if (
      checkTransactionStatus.data.body.resultInfo.resultStatus !== "TXN_SUCCESS"
    ) {
      // return next(
      //   new AppError(404, "Sorry, the transaction was not successfull")
      // );
      return res.redirect(
        `http://localhost:3000/conformation/${newPaytmTransactionParams.ORDERID}`
      );
    }
    // console.log("fuck you", JSON.parse(req.query.products));
    const booking = await Booking.create({
      transactionId: checkTransactionStatus.data.body.txnId,
      orderId: checkTransactionStatus.data.body.orderId,
      transactionDate: checkTransactionStatus.data.body.txnDate,
      transactionAmount: checkTransactionStatus.data.body.txnAmount,
      userRef: req.query.userId,
      products: JSON.parse(req.query.products),
    });
    console.log("booking successfully created", booking);

    try {
      const currentUser = await User.findById(req.query.userId);
      await new Email(currentUser).successOrder();
    } catch (err) {
      console.log(err);
    }
    res.redirect(
      `http://localhost:3000/conformation/${newPaytmTransactionParams.ORDERID}`
    );
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    // 1 Initally check if the user is authenticated
    if (!req.user) {
      return next(new AppError(404, "Please login to find the orders placed"));
    }
    // console.log("coming from gerer", req.user._id);

    const orders = await Booking.aggregate([
      {
        $match: { userRef: req.user._id },
      },
    ]);

    await Product.populate(orders, {
      path: "products",
      select: "-__v -technicalDetails -additionalDetails -reviewArr -id",
    });

    res.status(200).json({
      count: orders.length,
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};

exports.checkOrder = async (req, res, next) => {
  try {
    // get the order id from the req.body
    const { orderId } = req.params;
    console.log(req.params, orderId);
    // check if the order is present or not
    const order = await Booking.findOne({ orderId });
    console.log("orderis ", order);
    if (!order) {
      return next(
        new AppError(404, "No Order found with the provided orderId")
      );
    }
    return res.status(200).json({
      message: "success",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};
