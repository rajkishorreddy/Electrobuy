const mongoose = require("mongoose");
const dotenv = require("dotenv");

const User = require("./models/UserModel");

dotenv.config({
  path: "./config.env",
});
console.log("Mode =>", process.env.NODE_ENV);

const DBString = process.env.MONGO_DATABASE_URL.replace(
  "<password>",
  process.env.MONGO_DATABASE_PASSWORD
);
mongoose
  .connect(DBString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("the DB is connected successfully");
  })
  .catch((err) => {
    console.log(err);
    console.log("error in DB connection");
  });

User.deleteMany()
  .then((res) => console.log(res, "dl all docs successfully"))
  .catch((err) => console.log(err));
