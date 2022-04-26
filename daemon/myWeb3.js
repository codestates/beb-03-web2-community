require('dotenv').config();
const mongoose = require('mongoose');
const users = require('./models/users');

const fs = require('fs');

const {PROVIDER, ABI_FILE_PATH, ADDRESS_FILE_PATH} = process.env;

const Web3 = require("web3");
const web3 = new Web3(PROVIDER);

// 가장 마지막에 확인한 블록번호 조회
const checkedBlockNum = Number(
	fs.readFileSync('./blockNumber', {
		encoding: 'utf-8',
	}),
);

//contract주소 가져오기
var addressFile = ADDRESS_FILE_PATH;
var contractAddress = fs.readFileSync(addressFile).toString();

//ABI Decoder 추가
var abiFile = ABI_FILE_PATH;
var contractAbi= JSON.parse(fs.readFileSync(abiFile));
const abiDecoder = require('abi-decoder'); // NodeJS
abiDecoder.addABI(contractAbi);

//컨트랙트 연결
const contract= require('../server/contract/contract');

//tx리스트
const allTransactions = [];

const getTx = async (tx) => await web3.eth.getTransaction(tx);

//컨트랙트의 해당 토큰 잔액 조회
module.exports.getLastestTransactions  = async function getLastestTransactions(){
    try {
		let lastest = checkedBlockNum;
		
		console.log("NowBlockNumaber:"+lastest);

		// 최신 블록번호가 마지막에 확인한 블록번호보다 크다면,
		// 그 차이만큼 블록을 조회하기 위해 범위 업데이트
		await web3.eth.getBlockNumber((err, result) => {
			if (err) throw err;
			if (result > lastest) {
				lastest = result;
			}
		});

		if (checkedBlockNum === lastest) {
			return [];
		} else {
			// 가장 마지막에 확인한 블록의 다음 블록부터 가장 최신 블록까지의 모든 트랜잭션 조회
			for (let i = checkedBlockNum + 1; i <= lastest; i++) {
				
				//현재 한 블록만 테스트중
				const block = await web3.eth.getBlock(i);
				// 트랜잭션 해시로 모든 트랜잭션 조회
				for (let tx of block.transactions) {
					allTransactions.push(await getTx(tx));
				}
			}
			for(let tx of allTransactions){
				if(tx.from==null || tx.to==null){
					console.log("No balance Data")
					continue;
				}
				else if(tx.from.toLowerCase() === contractAddress.toLowerCase() || tx.to.toLowerCase() === contractAddress.toLowerCase()) {
					
					let decodeData =abiDecoder.decodeMethod(tx.input);
					let to = decodeData.params[0].value;
					let toBalance = await contract.getBalance(to);
					
					//해당 주소의 잔액 업데이트 
					await users.updateOne({address:to},{balance:toBalance});
				}else{
					console.log("No balance Data")
				}
			}

			//조회한 블록번호 파일에 저장
			fs.writeFileSync(
				'./blockNumber',
				String(lastest),
			);
		}
		
	} catch (err) {
		console.log(err);
	} finally{
		//mongoose db 종료
		mongoose.connection.close();
	}
}