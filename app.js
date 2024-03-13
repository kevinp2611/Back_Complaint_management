const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes");
require("dotenv").config();

express.application.prefix = express.Router.prefix = function (
  path,
  middleware,
  configure
) {
  var router = express.Router();
  this.use(path, middleware, router);
  configure(router);
  return router;
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);
app.listen(8080, () => {
  console.log("app running");
});
