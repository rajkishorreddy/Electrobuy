const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const AppError = require("../utils/AppError");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Every user must have a name"],
    },
    email: {
      type: String,
      unique: true,
    },
    avatar: {
      type: String,
      default: "https://i.ibb.co/ccBKYHB/default.jpg",
    },
    address: {
      type: String,
    },
    role: {
      //to make a user to admin, he must go to db and perform the explicit operation over there
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      minlength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      //the this keyword only works on save and create functions of the model
      // NOTE: Since we are using multiple auth strategies, the concept of validating the confirm password would be
      // better if done using a insatnce method
      validate: {
        //this validator is only used to check whether the user has given the crct ip
        validator: function (val) {
          return val === this.password;
        },
        message: "The inputted passwords are not same.",
      },
    },
    googleId: {
      type: Number,
    },
    githubId: {
      type: Number,
    },
    facebookId: {
      type: Number,
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetTokenExpiryTime: {
      type: Date,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    wishlistArr: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
    cartArr: [
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

// Pre Save Hooks
// Prior to creating the user, he must either have atleast one of the feilds present

userSchema.pre("save", function (next) {
  // ensuring that atleast one of the feilds is present
  console.log(this.googleId);
  if (!this.email && !this.googleId) {
    console.log("coming from here ...check for three items");
    return next(
      new AppError(400, "Please provide atleast one unique identifier")
    );
  }
  console.log("this.email is", this.email);
  if (this.email && !validator.isEmail(this.email)) {
    console.log("coming from here ...check for email validity");
    return next(new AppError(400, "Please provide proper email address"));
  }
  next();
});

// Encyprting the password in the case, when the user signs up using the basic method
userSchema.pre("save", async function (next) {
  // 1) Make sure that the current document has both feilds password and the confirm password, so that, we can
  // be sure that this hook only gets executed, when the user creates the profile thorugh the basic method
  if (!this.password || !this.confirmPassword) {
    console.log("coming from here ...encrypting the pass if there");
    return next();
  }

  // 2) Now encypt the passowrd and save to the passowrd feild
  // This pre hoook must only work when are saving or updating the password
  if (this.isModified("password")) {
    //2)update/create the password with the encrypted one
    this.password = await bcrypt.hash(this.password, 12);

    //3)we must remove the confirmPassword feild from saving onto the database
    this.confirmPassword = undefined;
  }
  //as this is a middleware, we must pass on to the next function
  next();
});

userSchema.pre("save", function (next) {
  //we should skip the middleware if the document that is saved is new one or in the other case
  //where we are only updating feilds other than the password field
  if (this.isNew || !this.isModified("password")) {
    console.log("coming from here ...its new user");
    next();
  } else {
    this.passwordChangedAt = Date.now() - 1000;
    next();
  }
});

// Instance methods
userSchema.methods.validateConfirmPassword = function () {
  return (
    this.password &&
    this.confirmPassword &&
    this.password === this.confirmPassword
  );
};

userSchema.methods.checkPassword = async (plainPass, hashPass) => {
  //this function returns true if the passwords are correct
  return await bcrypt.compare(plainPass, hashPass);
};

userSchema.methods.checkPasswordChangedAtProperty = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    //here the jwtTimeStamp and the this.passwordChangedAt have different formats of the time
    return JWTTimeStamp < parseInt(this.passwordChangedAt.getTime() / 1000);
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  // Here, we need to create a reset token based on the crypto module, and store the hashed version
  // and the expiry Time onto the document
  const resetToken = crypto.randomBytes(32).toString("hex");
  // We donot save the random string in the db, instead we save the ecrypted version of the random string
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetTokenExpiryTime =
    Date.now() + parseInt(process.env.RESET_PASSWORD_EXPIRY_TIME);
  // console.log(
  //   this.passwordResetToken,
  //   Date.now(),
  //   parseInt(process.env.RESET_PASSWORD_EXPIRY_TIME),
  //   Date.now() + parseInt(process.env.RESET_PASSWORD_EXPIRY_TIME),
  //   this.passwordResetTokenExpiryTime
  // );

  //We must return the orginal token, to be sent thru mail
  return resetToken;
};

//Pre Middleware queries
// Works for methods such as find, findById, findAll, etc
// This middleware only selects all users that are active
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "wishlistArr",
    select: "-__v -technicalDetails -additionalDetails -reviewArr -id",
  });
  next();
});

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "cartArr",
    select: "-__v -technicalDetails -additionalDetails -reviewArr -id",
  });
  next();
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
