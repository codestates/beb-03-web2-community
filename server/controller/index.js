// const models = require('../models');

module.exports = {
  users: {
    get: (req, res) => {
        // user 정보보기 : main > sign in btn > sign in page redirect
    },
    post: (req, res) => {
        // user 정보등록 : main > sign in btn
    }
  },

  board: {
    get: (req, res) => {
        // 해당 회원의 게시글 목록 확인(list) : mypage > 내 게시글 확인 탭
        // const userId = req.params.userId;

    },
    post: (req, res) => {
        // 해당 회원의 게시글 등록 : main(or 게시글) > 게시글쓰기 btn
        // const userId = req.params.userId;

    }
  },

  boardList: {
      get: (req, res) => {
        // 전체 게시글 목록 불러오기 : 게시글 page
      }
  }
};