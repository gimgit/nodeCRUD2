const jwt = require("jsonwebtoken"); //  jwt를 검증하기 위해 jwt 모듈 불러옴
const User = require("../schemas/user") // 실제로 데이터베이스와 비교해야하니까 유저사용자모델이 필요함


module.exports = (req, res, next) => {

    const { authorization } = req.headers; 
    const [tokenType, tokenValue] = authorization.split(' ');

    if (tokenType !== 'Bearer') { 
        res.status(401).send({  
            errorMessage: '로그인 후 사용하세요',
        });
        return; // 토큰타입이 Bearer가 아니면 무조건 로그인 후 사용하도록 return 처리하기.
    }

    try {
       const { userId } = jwt.verify(tokenValue, "CSK");

       User.findById(userId).exec().then((user) => { 
            res.locals.user = user;
            next(); 
       }); 

    } catch (error) {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요',
        });
        return; 
    }

};