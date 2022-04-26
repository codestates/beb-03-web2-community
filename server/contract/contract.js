require('dotenv').config();

const {PROVIDER, CONTRACT_OWNER_ADDRESS, ABI_FILE_PATH, ADDRESS_FILE_PATH} = process.env;

const Web3 = require("web3");
let web3 = new Web3(PROVIDER);

//ABI 파일, contract주소 가져오기
var fs = require('fs');
var abiFile = ABI_FILE_PATH;
var addressFile = ADDRESS_FILE_PATH;

var contractAbi= JSON.parse(fs.readFileSync(abiFile));
var contractAddress = fs.readFileSync(addressFile).toString();



//컨트랙트 연결
var contract = new web3.eth.Contract(contractAbi,contractAddress);

//컨트랙트의 해당 토큰 잔액 조회
module.exports.getBalance  = async function getBalance(toAddress){
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
module.exports.setTransfer  = async function setTransfer(toAddress,amount){ 
    const result = await contract.methods.transfer(toAddress, parseInt(amount)).send(
        //from : 컨트랙트 발행인의 지갑주소
        {from: CONTRACT_OWNER_ADDRESS, gasPrice: 100, gas: 100000},
        function(err, txhash){
            try{
                //console.log(txhash);
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



