
module.exports = {
    isNickname: (value) => {
    const namingRule = /^[a-zA-z0-9]{3,999}$/

       return (namingRule.test(value) == true ? true : false) 
    },   

    isPassword: (nickname,pw)=>{
        if(pw.length <4 || pw.includes(nickname) == true){
            return false
        }
        return true
    }
};


