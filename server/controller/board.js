require('dotenv').config();
const {PROVIDER, CONTRACT_OWNER_ADDRESS, ABI_FILE_PATH, ADDRESS_FILE_PATH} = process.env;
const board= require('../models/board');
const Web3 = require("web3");
web3 = new Web3(PROVIDER);

//ABI 파일, contract주소 가져오기
var fs = require('fs');
var abiFile = ABI_FILE_PATH;
var addressFile = ADDRESS_FILE_PATH;
var contractAbi= JSON.parse(fs.readFileSync(abiFile));
var contractAddress = fs.readFileSync(addressFile).toString();

//컨트랙트 연결
var contract = new web3.eth.Contract(contractAbi,contractAddress);

//컨트랙트의 해당 토큰 잔액 조회
async function getBalance(toAddress){
    try{  
       const balance = await contract.methods.balanceOf(toAddress).call();
       console.log("To 주소의 토큰 잔액"+balance);
        return balance;      
    }catch (e) {
        console.log(e);
        return e;
    }
}

//컨트랙트의 토큰 transfer 
async function setTransfer(toAddress,amount){ 
    const result = await contract.methods.transfer(toAddress, parseInt(amount)).send(
        //from : 컨트랙트 발행인의 지갑주소
        {from: CONTRACT_OWNER_ADDRESS, gasPrice: 100, gas: 100000},
        function(err, txhash){
            try{
                console.log(txhash);
                //여기서 나온 txhash 로 블록 조회 하고
                //조회가 끝나면 잔액 체크 해주고
                //바뀐 잔액을 DB로 업데이트 해준다. 
            }catch(err){
                console.log( "Error "+err.toString());
            }
        }
    )
    return result;
}

// 게시판 DB 추가
exports.insertBoard = (req, res) => {

    // 저장해야할 정보 가져오기
    var title = req.body.title;
    var content = req.body.content;
    var username = req.body.username;

	var boardData = new board({title:title,content:content,userName:username});

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

    //토큰 잔액조회 후 전송 테스트
    console.log(getBalance('0x1AcB74BdE9c0d593Fa3f6De408aa68A53c95918b'));
    setTransfer('0x1AcB74BdE9c0d593Fa3f6De408aa68A53c95918b',1000);
    console.log(getBalance('0x1AcB74BdE9c0d593Fa3f6De408aa68A53c95918b'));
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
