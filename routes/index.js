const authentication = require("./authentication.route");

module.exports = (app) => {
  app.use("/api/authentication", authentication);
  app.use("*", (req, res, next) => {
    res.send("hello these api not define");
  });
};


// module.exports = (app) => {
//   app.prefix("/api",  function (appRoute) {
//     appRoute.use("/employee", employee);
//     appRoute.use("/company", company);
//     appRoute.use("/auth", auth);
//     appRoute.use("/role-permission", rolePermission);
//   });
//   app.use("*", (req, res, next) => {
//     res.promise({ status: 404, data: "Route does not exists" });
//   });
// };
