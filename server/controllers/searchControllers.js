const mongoose = require("mongoose");

const AppError = require("./../utils/AppError");
const Product = require("./../models/productModel");
const APIFeatures = require("./../utils/APIFeatures");

exports.searchText = async (req, res, next) => {
  // 1) Get the text from the body
  const { searchText } = req.body;

  if (!searchText) {
    return next(new AppError(400, "Please specify some text"));
  }

  // 2) Get the results from the mongoDb
  const searchResults = await Product.aggregate([
    {
      $search: {
        text: {
          query: searchText,
          path: "fullName",
          fuzzy: {
            maxExpansions: 10,
          },
        },
      },
    },
    {
      $limit: 10,
    },
    {
      $project: {
        _id: 1,
        fullName: 1,
        score: { $meta: "searchScore" },
      },
    },
  ]);

  // 3) Send back the results
  res.status(200).json({
    searchResults,
  });
};
