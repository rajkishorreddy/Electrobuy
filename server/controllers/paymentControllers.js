const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const formidable = require("formidable");

const PaytmChecksum = require("./../utils/PaytmChecksum");
const AppError = require("./../utils/AppError");

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
    console.log(transactionGoods);
    transactionGoods = transactionGoods.map((good) => {
      return { merchantGoodsId: good };
    });
    console.log("asasasas");
    console.log("the transaction amount is " + transactionAmount);
    console.log("the goods are ", JSON.stringify(transactionGoods));

    // 3) Get all the details required for the transaction
    let paytmTransactionParams = {};

    // Make sure to add the details to the body of the obj
    paytmTransactionParams.body = {
      requestType: "Payment",
      mid: process.env.PAYTM_MERCHANT_ID,
      websiteName: process.env.PAYTM_WEBSITE_NAME,
      orderId: uuidv4(),
      callbackUrl: process.env.PAYTM_CALLBACK_URL,
      // goods: transactionGoods,
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

    paytmTransactionParams.head = {
      signature: paytmChecksumResultHash,
    };

    const transactionResponse = await axios({
      url: `https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MERCHANT_ID}&orderId=${paytmTransactionParams.body.orderId}`,
      method: "POST",
      data: paytmTransactionParams,
      // port: 1234,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": JSON.stringify(paytmTransactionParams).length,
        Accept: "*/*",
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
  let paytmTransactionParams = {};
  console.log(req.feilds);
  const isVerifySignature = await PaytmChecksum.verifySignature(
    JSON.stringify(feilds.CHECKSUM),
    process.env.PAYTM_MERCHANT_KEY,
    paytmChecksumResultHash
  );
  if (!isVerifySignature) {
    console.log("fucked up");
  }

  res.redirect("http://127.0.0.1:3000/");
};
