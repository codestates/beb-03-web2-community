const users = require('../models/users');
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');

exports.signup = async (req, res) => {

    // 회원가입 DB 저장
    
    const { userEmail, userName, password } = req.body;

    // 1. 입력 정보가 없으면 400 error
    if(!(userEmail && userName && password)) {
        return res.status(400).send('Bad Request : 회원가입 정보를 올바르게 입력해야합니다.')
    }
    // 2. findOne 으로 DB에 이미 있는 회원인지(userName 중복) 조회 => 있으면 'user already exists' send
    //-- 
    // await users.findOne({ userEmail: userEmail }, (err, msg) => {
    //     if(err) {

    //     }
    // })

    try {

        // 3. DB save
        const account = web3.eth.accounts.create();
        let usersData = new users({ 
                            userEmail: userEmail,
                            userName: userName, 
                            password: password, 
                            address: account.address,
                            privateKey: account.privateKey })

        await usersData.save((err) => {
            if(err) {
                res.status(404).send({message: 'fail to signup..'})
            } else {
                res.status(201).send({message: 'signup succeed!'})
                // return res.redirect('/');
            }
        })
    } catch(err) {
        res.status(500).send('server error')
    }
    
};

exports.signin = async (req, res) => {
    
    // 1. req.body에 userEmail, password를 입력받지 않았을 경우
    const { userEmail, password } = req.body;
    if(!(userEmail && password)) return res.status(400).send({message: 'Bad Request: 회원정보를 입력하세요.'})

    await users.find({ $and:[{ userEmail: userEmail }, { password: password }] })
    .then((result)=>{
        if(result.length===0) return res.json({ message: '잘못된 이메일이나 비밀번호 입니다.' })
        else {
            return res.json({result: result[0]})
        }
    })
    
    // 추후 구현
    // 2. userEmail, password를 입력받아 db에서 match 여부를 돌려준다
        // 2-1. userEmail match 확인
    // users.findOne({userEmail: userEmail}, (err, user) => {
    //     if(!user) return res.json({loginSuccess: false, message: "등록되지 않은 이메일입니다."})
    // })
        // 2-2. password match 확인
    // users.comparePassword(password, (err, isMatch) => {
    //     if (!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다" });
    // })
    // 3. token 생성
    // users.generateToken

    // 4. 쿠키에 token 저장

};

exports.userInfo = async (req, res) => {


    // await users.findOne
};