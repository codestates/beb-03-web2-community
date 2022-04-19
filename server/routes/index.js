const express = require('express');
const router = express.Router();
const boardListRouter = require('./boardList');
const usersRouter = require('./users')
// const indexController = require("../controller/index");

// localhost:8080

router.get('/users', usersRouter);
router.get('/board', boardListRouter);

module.exports = router;