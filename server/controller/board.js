const board = require('../models/board');
const contract= require('../contract/contract');
// 게시판 DB 추가
exports.insertBoard = (req, res) => {

    // 저장해야할 정보 가져오기
    var title       = req.body.title;
    var content     = req.body.content;
    var username    = req.body.username;
    var useremail   = req.body.useremail;

	var boardData = new board({title:title, content:content, userName:username, userEmail:useremail});

    //mongodb 저장
    boardData.save((err)=>{
        let body = {};
        if(err) {
            body.message = "fail";
            res.status(404).send(body);
        }
        else {
            body.message = "success";
            res.status(200).send(body);
        }
    })

    //User Email로 해당 사용자 정보 조회 후 address정보를 받아와 토큰 전송
    //토큰 잔액조회 후 전송 테스트
};

// 게시판 DB 조회
exports.getBoard = async (req, res) =>{

    //변수 선언
    let title = "";
    let resultsPerPage = 0;
    let page = 0;
    let body = {};

    //title 검색어 추가
    if(req.query.title){
        title = req.query.title;
    }
    //페이지당 조회 개수 입력
    if(req.query.count){
        resultsPerPage = req.query.count;
    }
    //페이지 번호 조회
    if(req.query.page){
        page = req.query.page;
    }
   
    //mongodb 조회
    board.find({title:{$regex:title}})
        .limit(resultsPerPage)
        .skip(resultsPerPage * page)
        .then((results) => {
            body.message = "success";
            body.data = results;
            return res.status(200).send(body);
        })
        .catch((err) => {
            body.message = "fail";
            body.err = err;
            return res.status(500).send(body);
        });
}
