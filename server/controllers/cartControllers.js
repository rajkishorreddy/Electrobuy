const User = require("../models/UserModel");
const AppError = require("../utils/AppError");

exports.getAllCartItems = async (req, res, next) => {
  try {
    // 1) Get the user details from the req.user._id
    // 1) Make sure that the user is logged in
    if (!req.user) {
      return next(new AppError(401, "Please log in again"));
    }

    // 2) Get all the documents from the cart array (make sure that the arr is populated)
    if (!req.user._id) {
      return next(new AppError(400, "Please login/ signup again"));
    }
    // console.log(req.user._id, req.params.productId);

    const { cartArr } = await User.findById(req.user._id);

    // 3) Send back the response
    res.status(200).json({
      status: "success",

      count: cartArr.length,
      totalFinalPrice: cartArr.reduce((acc, currentVal) => {
        return acc + currentVal.finalPrice;
      }, 0),
      totalSavingPrice: cartArr.reduce((acc, currentVal) => {
        return acc + currentVal.savingPrice;
      }, 0),
      totalOriginalPrice: cartArr.reduce((acc, currentVal) => {
        return acc + currentVal.originalPrice;
      }, 0),
      data: cartArr,
    });
  } catch (error) {
    next(error);
  }
};

exports.addCartItem = async (req, res, next) => {
  try {
    // 1) Get the user details from the req.user._id
    // 1) Make sure that the user is logged in
    if (!req.user) {
      return next(new AppError(401, "Please log in again"));
    }

    // 2) Update the cart array with the new product, whose id is taken from the query paramter
    if (!req.params.productId) {
      return next(
        new AppError(400, "Please provide the product id in the url")
      );
    }
    console.log(req.user._id, req.params.productId);

    let { cartArr } = await User.findById(req.user._id);

    if (!cartArr) {
      return next(new AppError(400, "Please login/ signup again"));
    }

    const productIndex = cartArr.findIndex(
      (el) => el.id === req.params.productId
    );
    if (productIndex !== -1) {
      return next(new AppError(400, "Cannot add the same product twice"));
    }

    cartArr.push(req.params.productId);
    cartArr = cartArr.map((el) => el._id);
    // console.log(cartArr);

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        cartArr,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return next(new AppError(400, "Please login/ signup again"));
    }

    // 3) Send back the response
    res.status(200).json({
      status: "success",
      count: updatedUser.cartArr.length,
      totalFinalPrice: updatedUser.cartArr.reduce((acc, currentVal) => {
        return acc + currentVal.finalPrice;
      }, 0),
      totalSavingPrice: updatedUser.cartArr.reduce((acc, currentVal) => {
        return acc + currentVal.savingPrice;
      }, 0),
      totalOriginalPrice: updatedUser.cartArr.reduce((acc, currentVal) => {
        return acc + currentVal.originalPrice;
      }, 0),
      data: updatedUser.cartArr,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCartItem = async (req, res, next) => {
  try {
    // 1) Get the user details from the req.user._id
    // 1) Make sure that the user is logged in
    if (!req.user) {
      return next(new AppError(401, "Please log in again"));
    }

    // 2) Update the cart array with the new product, whose id is taken from the query paramter
    if (!req.params.productId) {
      return next(
        new AppError(400, "Please provide the product id in the url")
      );
    }
    console.log(req.user._id, req.params.productId);

    let { cartArr } = await User.findById(req.user._id);
    if (!cartArr) {
      return next(new AppError(400, "Please login/ signup again"));
    }

    if (!cartArr.length) {
      return next(new AppError(400, "There are no products in the cart"));
    }

    // Delete that item from the arr

    const productIndex = cartArr.findIndex(
      (el) => el.id === req.params.productId
    );
    // console.log("prod index is", productIndex);

    if (productIndex === -1) {
      return next(
        new AppError(
          400,
          "There is no product in the cart initially, to delete it"
        )
      );
    }

    cartArr.splice(productIndex, 1);
    // console.log(cartArr.length);
    cartArr = cartArr.map((el) => el._id);

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        cartArr,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return next(new AppError(400, "Please login/ signup again"));
    }

    // 3) Send back the response
    res.status(200).json({
      status: "success",
      count: updatedUser.cartArr.length,
      totalFinalPrice: updatedUser.cartArr.reduce((acc, currentVal) => {
        return acc + currentVal.finalPrice;
      }, 0),
      totalSavingPrice: updatedUser.cartArr.reduce((acc, currentVal) => {
        return acc + currentVal.savingPrice;
      }, 0),
      totalOriginalPrice: updatedUser.cartArr.reduce((acc, currentVal) => {
        return acc + currentVal.originalPrice;
      }, 0),
      data: updatedUser.cartArr,
    });
  } catch (error) {
    next(error);
  }
};
