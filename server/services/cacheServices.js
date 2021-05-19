const redis = require("redis");
const util = require("util");

const redisUrl = process.env.REDIS_URL;
const client = redis.createClient(redisUrl);
