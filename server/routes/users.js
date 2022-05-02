var express = require('express');
var router = express.Router();

const userController = require("../controller/users");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.post("/signout", userController.signout);
router.get("/userInfo", userController.userInfo);

module.exports = router;
