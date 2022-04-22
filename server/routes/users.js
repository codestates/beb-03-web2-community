var express = require('express');
var router = express.Router();

const userController = require("../controller/users");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/userInfo", userController.userInfo);

module.exports = router;
