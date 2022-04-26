const users = require('../models/users');
const Web3 = require('web3');
const web3 = new Web3("http://localhost:7545/");

exports.signup = async (req, res) => {

    // 회원가입 DB 저장
    
    const { userEmail, userName, password } = req.body;

    // 1. 입력 정보가 없으면 400 error
    if(!(userEmail && userName && password)) {
        return res.status(400).send('Bad Request : 회원가입 정보를 올바르게 입력해야합니다.')
    }
    
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
    

    /* 이전 코드
    // await users.find({ $and:[{ userEmail: userEmail }, { password: password }] })
    // .then((result)=>{
    //     if(result.length===0) return res.json({ message: '잘못된 이메일이나 비밀번호 입니다.' })
    //     else {
    //         return res.json({result: result[0]})
    //     }
    // })

    */

    // 입력받은 회원정보(이메일, 패스워드)가 db에 match 되는지 체크
    // (각 정보마다 match 되지 않을 경우 다른 json send, 비밀번호는 암호화하여 전송 후 비교)
    // match 되는 경우, jwt token 생성

    // 1. req.body에 userEmail, password를 입력받지 않았을 경우
    const { userEmail, password } = req.body;
    if(!(userEmail && password)) return res.status(400).send({message: 'Bad Request: 회원정보를 입력하세요.'})
 
    // 2. userEmail DB 비교
    await users.findOne({ userEmail: userEmail }, (err, userData) => {
        if (err) {
          return res.json({
            loginSuccess: false,
            message: "존재하지 않는 아이디입니다.",
          });
        }
        // 3. comparePassword  in DB
        userData
          .comparePassword(password)
          .then((isMatch) => {
            if (!isMatch) {
              return res.json({
                loginSuccess: false,
                message: "비밀번호가 일치하지 않습니다",
              });
            }
        // 4. 회원정보 모두 일치시 token generate
        userData
              .generateToken()
              .then((userData) => {

                // cookie 에 token(_id) 저장
                res
                  .cookie("x_auth", userData.token)
                  .status(200)
                  .json({ loginSuccess: true, user_Id: userData._id });

              }) // end generateToken
              .catch((err) => {
                res.status(400).send(err);
              });

          }) // end comparePassword.then
          .catch((err) => res.json({ loginSuccess: false, err }));
    
    }); // end find Email
}

exports.userInfo = async (req, res) => {
    // cookie-parser로 cookie의 token 을 받아 회원정보를 조회한다.
    let token = req.cookies.x_auth;
    console.log(token);
    await users
        .findByToken(token)
        .then((user) => {
        if (!user) return res.json({ isAuth: false, error: true });
          req.token = token;
          req.user = user;
          res.json({ userInfo: user });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
};