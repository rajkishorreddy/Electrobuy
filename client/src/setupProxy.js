const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy("/users/google", {
      target: "https://127.0.0.1:8080",
      changeOrigin: true,
    })
  );
};
