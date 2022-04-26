require('dotenv').config();
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
console.log(ADDRESS_FILE_PATH);
var contractAddress = fs.readFileSync(addressFile).toString();

//ABI Decoder 추가
var abiFile = ABI_FILE_PATH;
var contractAbi= JSON.parse(fs.readFileSync(abiFile));
const abiDecoder = require('abi-decoder'); // NodeJS
abiDecoder.addABI(contractAbi);

//tx리스트
const allTransactions = [];

const getTx = async (tx) => await web3.eth.getTransaction(tx);

//컨트랙트의 해당 토큰 잔액 조회
module.exports.getLastestTransactions  = async function getLastestTransactions(){
    try {
		let lastest = checkedBlockNum;
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
			//for (let i = checkedBlockNum + 1; i <= lastest; i++) {
				
				//현재 한 블록만 테스트중
				const block = await web3.eth.getBlock(12217381);

				// 트랜잭션 해시로 모든 트랜잭션 조회
				for (let tx of block.transactions) {
					allTransactions.push(getTx(tx));
				}
			//}
			console.log(contractAddress);
			// 모든 트랜잭션 중에서, 조건에 부합하는 트랜잭션을 배열로 리턴(Promise)
			return Promise.all(allTransactions)
				.then((data) => {
					const result = [];
					for (let tx of data) {
						if (tx.from.toLowerCase() === contractAddress || tx.to.toLowerCase() === contractAddress) {
							console.log(abiDecoder.decodeMethod(tx.input))
							//해당 영수증을 조회했을때 to 유저에게 1000을 더 할것??
							result.push(abiDecoder.decodeMethod(tx.input));
						}
					}
					return result;
				})
				.then((data) => {
					// 가장 마지막에 확인한 블록번호 저장
					fs.writeFileSync(
						'./blockNumber',
						String(lastest),
					);
					return data;
				});
		}
	} catch (err) {
		console.log(err);
	}
}