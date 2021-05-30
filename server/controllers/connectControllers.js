// This page contains all the middlewares that are related to connecting their user profile,
// with other auth methods

exports.addURLParamToHeader = (req, res, next) => {
  console.log("the req.params is prior to connecting to google is", req.params);
  if (req && req.params && req.params.jwt) {
    req.headers.authorization = `Bearer ${req.params.jwt}`;
    return next();
  }
  next();
};
