var express = require('express');
var router = express.Router();

const indexController = require("../controller/index");

router.get("/index", indexController.getRoot);