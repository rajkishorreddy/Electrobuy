const passport = require("passport");

const User = require("../models/userModel");
const AppError = require("../utils/AppError");

exports.getAllWishlistItems = async (req, res, next) => {
  try {
    // 1) Get the user details from the req.user._id
    // 1) Make sure that the user is logged in
    if (!req.user) {
      return next(new AppError(401, "Please log in again"));
    }

    // 2) Get all the documents from the wishlist array (make sure that the arr is populated)
    if (!req.user._id) {
      return next(new AppError(400, "Please login/ signup again"));
    }
    // console.log(req.user._id, req.params.productId);

    const { wishlistArr } = await User.findById(req.user._id);
    console.log(wishlistArr);
    // 3) Send back the response
    res.status(200).json({
      status: "success",
      count: wishlistArr.length,
      data: wishlistArr,
    });
  } catch (error) {
    next(error);
  }
};

exports.addWishlistItem = async (req, res, next) => {
  try {
    // 1) Get the user details from the req.user._id
    // 1) Make sure that the user is logged in
    if (!req.user) {
      return next(new AppError(401, "Please log in again"));
    }

    // 2) Update the wishlist array with the new product, whose id is taken from the query paramter
    if (!req.params.productId) {
      return next(
        new AppError(400, "Please provide the product id in the url")
      );
    }
    console.log(req.user._id, req.params.productId);

    let { wishlistArr } = await User.findById(req.user._id);

    if (!wishlistArr) {
      return next(new AppError(400, "Please login/ signup again"));
    }

    const productIndex = wishlistArr.findIndex(
      (el) => el.id === req.params.productId
    );
    if (productIndex !== -1) {
      return next(new AppError(400, "Cannot add the same product twice"));
    }

    wishlistArr.push(req.params.productId);
    wishlistArr = wishlistArr.map((el) => el._id);
    // console.log("asasasas", wishlistArr);

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        wishlistArr,
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
      count: updatedUser.wishlistArr.length,
      data: updatedUser.wishlistArr,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteWishlistItem = async (req, res, next) => {
  try {
    // 1) Get the user details from the req.user._id
    // 1) Make sure that the user is logged in
    if (!req.user) {
      return next(new AppError(401, "Please log in again"));
    }

    // 2) Update the wishlist array with the new product, whose id is taken from the query paramter
    if (!req.params.productId) {
      return next(
        new AppError(400, "Please provide the product id in the url")
      );
    }
    console.log(req.user._id, req.params.productId);

    let { wishlistArr } = await User.findById(req.user._id);

    if (!wishlistArr) {
      return next(new AppError(400, "Please login/ signup again"));
    }

    if (!wishlistArr.length) {
      return next(new AppError(400, "There are no products in the wishlist"));
    }

    // Delete that item from the arr

    const productIndex = wishlistArr.findIndex(
      (el) => el.id === req.params.productId
    );
    // console.log("prod index is", productIndex);

    if (productIndex === -1) {
      return next(
        new AppError(
          400,
          "There is no product in the wishlist initially, to delete it"
        )
      );
    }

    wishlistArr.splice(productIndex, 1);
    // console.log(wishlistArr.length);
    wishlistArr = wishlistArr.map((el) => el._id);

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        wishlistArr,
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
      count: updatedUser.wishlistArr.length,
      data: updatedUser.wishlistArr,
    });
  } catch (error) {
    next(error);
  }
};
