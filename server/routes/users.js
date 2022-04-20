var express = require('express');
var router = express.Router();

const userController = require("../controller/users");

router.post("/", userController.insert);
router.get("/", userController.get);

module.exports = router;
