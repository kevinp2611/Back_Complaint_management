const router = require("express").Router();
const { verifyToken } = require("../middleware/authentication");
const { authenticationController } = require("../controller/index");

router.post("/login", authenticationController.login);
router.post("/registration", authenticationController.register);
router.post("/logout", [verifyToken], authenticationController.logout);

module.exports = router;
