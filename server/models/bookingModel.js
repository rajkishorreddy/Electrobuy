const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: [true, "Every transaction must have a unique transaction id"],
      unique: true,
    },
    orderId: {
      type: String,
      required: [true, "Every transaction must have a order id"],
      unique: true,
    },
    transactionDate: {
      type: Date,
      required: [true, "Every transaction must have a date and time"],
    },
    transactionAmount: {
      type: Number,
      required: [true, "Every transaction must have a transaction amount"],
    },
    userRef: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Every transaction must have a user"],
    },
    products: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

bookingSchema.pre(/^find/, function (next) {
  console.log("coming here");
  this.populate({
    path: "products",
    select: "-__v -technicalDetails -additionalDetails -reviewArr -id",
  });
  next();
});

const Booking = new mongoose.model("Booking", bookingSchema);

module.exports = Booking;
