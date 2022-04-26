const board = require('../models/board');
const users = require('../models/users');
const contract = require('../contract/contract');

// 게시판 DB 추가
exports.insertBoard = async (req, res) => {
    
    let body = {};

    // 저장해야할 정보 가져오기
    const title       = req.body.title;
    const content     = req.body.content;
    const username    = req.body.username;
    const useremail   = req.body.useremail;

	const boardData = new board({title:title, content:content, userName:username, userEmail:useremail});

    //사용자가 DB에 있는지 확인
    let userAddress = await users.findOne({userEmail:useremail},(err,datas)=>{
        if(err){
            consoel.log(err);
        }else{
            return datas;
        }
    }).then((data)=>data.address);

    //사용자가 있으면
    if(userAddress){
        //mongodb 저장
        boardData.save((err)=>{
           
            if(err) {
                body.message = "fail";
                res.status(404).send(body);
            }
            else {
                //해당 사용자에게 토큰전송
                contract.setTransfer(userAddress,1000);
                
                body.message = "success";
                res.status(200).send(body);
            }
        })
    }else{
        body.message = "Not Match User";
        res.status(404).send(body);
    }

    contract.getBalance(userAddress);

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
        resultsPerPage = parseInt(req.query.count);
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
            console.log(err);
            body.message = "fail";
            body.err = err;
            return res.status(500).send(body);
        });
}
