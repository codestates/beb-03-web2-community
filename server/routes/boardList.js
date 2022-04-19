const express = require('express');
const router = express.Router();
const controller = require('../controller');

// localhost:8080/boardList

// 전체 게시글 목록 확인
router.get('/', controller.boardList.get);

// 게시글 등록 -- 특정 user의 게시글 등록 case만 고려하면 없어도 됨(게시글쓰려면 sign in 필요)
// router.post('/', controller.board.post);

module.exports = router;