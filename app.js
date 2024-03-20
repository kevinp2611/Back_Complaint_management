const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes");
const rateLimitMiddleware = require("./middleware/rateLimiter");
var cors = require("cors");
require("dotenv").config();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
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
app.use(rateLimitMiddleware);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);
app.listen(8080, () => {
  console.log("app running");
});
