const express = require("express");
const path = require("path");

const logger = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const compression = require("compression");
const cors = require("cors");

const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const paymentRouter = require("./routes/paymentRouter");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorControllers");
require("./services/passportServices");
const redisClient = require("./services/cacheServices");

const app = express();

//Middleware functions

//General middleware functions

//Passport Initialization
app.use(passport.initialize());

//Adding CORS support
app.use(
  cors({
    origin: [
      process.env.DEVELOPMENT_CLIENT_URL,
      process.env.PRODUCTION_CLIENT_URL,
    ], // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);
//enable pre-flight
app.options("*", cors());

//Logging middleware function
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

//Setting up HTTP headers
// we need to explicitly set the option of content security policy to false to use the mapbox script
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

//Setting up rate limiter middleware
const limiter = rateLimit({
  //number of max requests made
  max: 50,
  //time limit for these requests
  //windowMs: 60 * 60 * 1000,
  windowMs: 60 * 60,
  //error message
  message: "Too many attempts from the same IP. Please try again later",
});
app.use(limiter);

//Body-parser middleware functions
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//Cookie parser middleware
app.use(cookieParser());

//Data sanitizaton against NOSQL query injection attacks
app.use(mongoSanitize());

//Data sanitizaton against XSS attacks
app.use(xss());

//Prevent paramter pollution
// NOTE: Need to change this accordingly
app.use(
  hpp({
    whitelist: [
      "finalPrice",
      "originalPrice",
      "savingPrice",
      "fullName",
      "description",
      "technicalDetails",
      "additionalDetails",
      "imageArr",
    ],
  })
);

//Compression
app.use(compression());

//Custom middleware function
// app.use((req, res, next) => {
//   console.log("this is the middleware function talking");
//   console.log("the cookies attached to this req is");
//   console.log(req.cookies);
//   next();
// });

app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/payments", paymentRouter);

// error handler
app.all(
  "*",
  (req, res, next) => {
    res.status(404).json({
      status: "error",
      message: `the route ${req.originalUrl} is not defined`,
    });
  }
  // res.status(404).render("errorTemplate", () => {
  //   next(new AppError(404, `the route ${req.originalUrl} is not defined`));
  // });
);

//Global error handler
app.use(globalErrorHandler);

module.exports = app;
