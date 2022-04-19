const express = require('express');
const router = express.Router();
const controller = require('.././controller');

// localhost:8080/users

// 해당 user의 정보를 보거나 회원가입을 할 경우
router.get('/', controller.users.get);
router.post('/', controller.users.post);

// 회원정보 update--optional
// router.put or router.patch

// 해당 회원의 게시글 목록 확인(list)
router.get('/:userId/board', controller.board.get) 

// 해당 회원의 게시글 등록
router.post('/:userId/board', controller.board.post)

// 해당 회원의 게시글 수정
// router.put or router.patch

module.exports = router;