const AppError = require("./../utils/AppError");
const User = require("../models/userModel");

exports.updateMe = async (req, res, next) => {
  try {
    // 1) Get all the data from the body
    const { name, email, address } = req.body;

    if (!name && !email && !address) {
      return next(new AppError(400, "Please provide atleast one detail"));
    }

    const userDetails = {};
    if (name) {
      userDetails.name = name;
    }
    if (email) {
      userDetails.email = email;
    }
    if (address) {
      userDetails.address = address;
    }

    // 2) Check if the user is authenticated
    if (!req.user) {
      return next(new AppError(404, "Please login to update your profile"));
    }
    console.log(userDetails);

    // 2) Get the user based on the already authenticated user
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      userDetails,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedUser) {
      return next(
        new AppError(
          400,
          "Not able to find the user in the database. Please login again."
        )
      );
    }

    //3)send back a response
    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });

    // 1) if an
  } catch (err) {
    next(err);
  }
};

exports.updateAvatar = async (req, res, next) => {
  try {
    // 1) Check for the avatar property in the req.body
    const { avatar } = req.body;
    if (!avatar) {
      return next(new AppError(400, "Please provide the avatar"));
    }

    // 2) Check if the user is authenticated
    if (!req.user) {
      return next(new AppError(404, "Please login to update your profile"));
    }

    // 3) Update the user and send back the user
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return next(
        new AppError(
          400,
          "Not able to find the user in the database. Please login again."
        )
      );
    }

    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    // This middleware is responsible for updating the password of the profile
    // 1) Get the previous password, new password and the new confirmPassword
    const { currentPassword, password, confirmPassword } = req.body;
    if (!currentPassword || !password || !confirmPassword) {
      return next(new AppError(400, "Please provide all the required fields"));
    }

    // 2) Check if the user is authenticated
    if (!req.user) {
      return next(new AppError(404, "Please login to update your profile"));
    }

    // 2) As the user is already present as req.user, verify the current  password with the given one
    // As the required method, is present on the monggose document, we will initally get the user from the DB
    const user = await User.findById(req.user._id).select("+password");

    const checkPasswordBool = await user.checkPassword(
      currentPassword,
      user.password
    );
    if (!checkPasswordBool) {
      return next(new AppError(401, "The current password is incorrect"));
    }

    // 3) Now, update the user with the new password
    user.password = password;
    user.confirmPassword = confirmPassword;

    const updatedUser = await user.save();
    console.log("the updated user is ", updatedUser);

    //Send back the response
    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getProfileInfo = async (req, res, next) => {
  // 1) Check whether the user is already logged in
  if (!req.user) {
    return next(
      new AppError(404, "Please login to get your profile information.")
    );
  }

  // 2) Get the profile information
  const loggedInUser = await User.findById(req.user._id);
  if (!loggedInUser) {
    return next(
      new AppError(
        400,
        "Not able to find the user in the database. Please login again."
      )
    );
  }

  res.status(200).json({
    status: "success",
    data: loggedInUser,
  });
};
