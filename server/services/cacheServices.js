const util = require("util");

const redis = require("redis");
const mongoose = require("mongoose");

const Product = require("./../models/productModel");
const APIFeatures = require("./../utils/APIFeatures");

// const productController = require('./../controllers/productControllers')

const redisClient = redis.createClient({
  host: process.env.REDIS_DATABASE_URL.split(":")[0],
  port: process.env.REDIS_DATABASE_URL.split(":")[1],
  password: process.env.REDIS_DATABASE_PASSWORD,
});
let get = util.promisify(redisClient.get).bind(redisClient);
redisClient.on("connect", () => {
  console.log("the Redis DB is connected successfully");
});

redisClient.on("error", function (error) {
  console.log(error);
});

const addProductsToCache = async () => {
  // Caching certain data, when server is started
  // NOTE: I am creating a cache only for the products, everytime i create a server
  // This works because of the fact that Products are not updated at all
  let allCategories = await Product.aggregate([
    {
      $group: {
        _id: "$category",
      },
    },
  ]);

  // flush out the cache
  await redisClient.flushall();
  console.log("data is flushed");

  // allCategories.forEach(async (category, i) => {
  //   console.log(JSON.stringify(category._id));
  //   redisClient.set(i, JSON.stringify(category._id));
  // });

  // should not use foreach
  for (let i = 0; i < allCategories.length; i++) {
    // console.log("Adding the data for the category", allCategories[i]._id);
    const features = new APIFeatures(
      Product.find({ category: allCategories[i]._id }),
      {
        feildsCapacity: "low",
      }
    )
      .filter()
      .match()
      .filterSpecific()
      .sort()
      .select()
      .pagination();

    const data = await features.query;
    // console.log("data is fetched from mongo", allCategories[i]._id);

    // console.log("data for", allCategories[i]._id, data.length);
    redisClient.set(
      JSON.stringify({
        ...features.query.getQuery(),
        ...features.query.splObj,
        collection: features.query.mongooseCollection.name,
      }),
      JSON.stringify(data)
    );
  }
};

const exec = mongoose.Query.prototype.exec;
mongoose.Query.prototype.exec = async function () {
  // 1) Check if the data exists in the db,
  const redisQueryKey = {
    ...this.getQuery(),
    ...this.splObj,
    collection: this.mongooseCollection.name,
  };
  console.log("redisQueryKey", redisQueryKey);

  const cacheData = await get(JSON.stringify(redisQueryKey));

  if (cacheData) {
    console.log("Data is fetched from the cache");
    const doc = JSON.parse(cacheData);

    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }
  // console.log(this.schema.options.toJSON());
  // 2) Else pass on the query to the mongodb instance
  console.log("Data is fetched from the mongodb instance");
  return exec.apply(this, arguments);
};

addProductsToCache();

module.exports = redisClient;
