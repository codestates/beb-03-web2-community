const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// Define Schemes
const usersSchema = new mongoose.Schema({
  
  userEmail : { type: String, required: true },
  userName : { type: String, required: true },  
  password: { type: String, required: true, trim: true },
  address: { type: String, required: true },
  balance: { type: Number, default: 0 },
  create_date: { type: Date, default: Date.now },
  privateKey: { type: String, required: true }
},
{
  timestamps: true
});


// signup 시 save 전에 password 를 암호화하는 function
// save 메소드가 실행되기전에 비밀번호를 암호화하는 로직을 짜야한다
usersSchema.pre("save", function (next) {
  let user = this;

  // model 안의 paswsword가 변환될때만 암호화
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// singin 비밀번호 비교시 입력받은 비밀번호를 암호화해서 비교
usersSchema.methods.comparePassword = function (plainPassword) {
  // plainPassword를 암호화해서 현재 비밀번호와 비교
  return bcrypt
    .compare(plainPassword, this.password)
    .then((isMatch) => isMatch)
    .catch((err) => err);
};

// jwt 토큰 생성 후 
usersSchema.methods.generateToken = function () {
  const token = jwt.sign(this._id.toHexString(), "secretToken");
  this.token = token;
  return this.save()
    .then((user) => user)
    .catch((err) => err);
};

usersSchema.statics.findByToken = function (token) {
  let user = this;
  
  // secretToken을 통해 user의 id값을 받아오고 해당 아이디를 통해
  // DB에 접근해서 유저의 정보를 가져온다
  return jwt.verify(token, "secretToken", function (err, decoded) {
    return user
      .findOne({ _id: decoded })
      .then((user) => user)
      .catch((err) => err);
  });
};

// Create Model & Export
module.exports = mongoose.model('users', usersSchema);