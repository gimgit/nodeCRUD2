const express = require('express');
const router = express.Router();
const User = require("../schemas/user")
const jwt = require('JsonWebToken')
const authMiddleware = require('../middlewares/auth_middleware.js');


//회원가입
router.post("/signUp", async (req, res, next)=>{
    const nickname = req.body.nickname
    const pw1 = req.body.pw1
    const pw2 = req.body.pw2
    const namingRule = /^[a-zA-z0-9]{3,999}$/
    const existingUser = await User.findOne({nickname : nickname});
  
    // 패스워드 양식 확인
    if (pw1.length < 4 || pw1.includes(nickname) == true){
      res.status(400).send({
        errorMessage: "패스워드는 4자이상, 닉네임을 포함하지 않음"
      })
      return;
    }
    // 패스워드 일치 확인
    if (pw1 !== pw2) {
      res.status(400).send({
        errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
      });
      return;
    }
    // 닉네임 양식 확인
    if (nickname < 3 || namingRule.test(nickname) == false){
      res.status(400).send({
        errorMessage: "닉네임은 3자이상, 알파벳 대소문자, 숫자로 구성"
      })
      return;
    }
    // 닉네임 중복 확인
    if (existingUser !== null){
      res.status(400).send({
        errorMessage: "아이디 중복"
      })
      return;
    }

      const user = new User({ 
      nickname : nickname, 
      password : pw1
      });
      await user.save();
  
      res.redirect('/login') 
    })

//로그인

router.post('/auth', async (req, res) => {
  console.log('hi')
  
    const { nickname, password } = req.body;

    const user = await User.findOne({ nickname });

    if (!user || password !== user.password) {
      res.status(400).send({errorMessage : '이메일 또는 패스워드가 잘못됐습니다.'});
      return;
    }

    const token = jwt.sign(
      { userId: user.userId }, 'CSK');
    res.send({
      token: token, nickname : user.nickname
    });
});

router.get('/users/me', authMiddleware, async (req, res) => {
  const user = res.locals.user;

  if (user === null) {
        res.status(401).send();
        return;
      }

  res.status(200).send({    //status 200 빠지면 토큰 전달 안되는듯.
      user: { // 가지고 있는 정보들 중에서 중요한 정보 빼고 클라이언트에게 전송한다.
      nickname : user.nickname,
      }
  }); 
});



  module.exports = router;

  