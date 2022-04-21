var express = require('express');
var router = express.Router();

const boardController = require("../controller/board");

router.post("/insert", boardController.insertBoard);
router.get("/list", boardController.getBoard);

module.exports = router;
