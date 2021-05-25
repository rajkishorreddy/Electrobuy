const AppError = require("./../utils/AppError");

exports.updateMe = async (req, res, next) => {
  try {
    // Get all the data from the body
    const { fullName, email, address } = req.body;
  } catch (err) {}
};

exports.updatePassword = async (req, res, next) => {
  try {
    // This middleware is responsible for updating the password of the profile
    // 1) Get the previous password, new password and the new confirmPassword
    const { currentPassword, password, confirmPassword } = req.body;
    if (!currentPassword || !password || !confirmPassword) {
      return next(new AppError(400, "Please provide all the required fields"));
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
