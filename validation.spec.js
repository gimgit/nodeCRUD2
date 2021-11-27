const { isNickname, isPassword} = require('./validation');


test('닉네임은 알파벳 대소문자, 숫자로 구성한다', () => {
    expect(isNickname('asdf')).toEqual(true);
    expect(isNickname('asdF')).toEqual(true);
    expect(isNickname('0123')).toEqual(true);
    expect(isNickname('asdf1234')).toEqual(true);
    expect(isNickname('ASDF1234')).toEqual(true);
    expect(isNickname('asdF1234')).toEqual(true);
    expect(isNickname('ㅁㄴㅇㄹ234')).toEqual(false);
    expect(isNickname('ㅁㄴㅇㄹ')).toEqual(false);
});

test('닉네임은 3자 이상이다', () => {
    expect(isNickname('abc')).toEqual(true);
    expect(isNickname('123')).toEqual(true);
    expect(isNickname('ab')).toEqual(false);
    expect(isNickname('12')).toEqual(false);
});

test('패스워드는 4자 이상이며 닉네임을 포함하지 않는다.', () => {
    expect(isPassword('name', 'pass')).toEqual(true);
    expect(isPassword('name', 'pnaasmse')).toEqual(true);
    expect(isPassword('name', 'namepass')).toEqual(false);
    expect(isPassword('name', 'panamess')).toEqual(false);
});


