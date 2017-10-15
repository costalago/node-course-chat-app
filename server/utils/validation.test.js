const expect = require('expect');
let {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {

        let res = isRealString(1);
        expect(res).toBe(false);
    });

    it('should reject string with only spaces', () => {

        let res = isRealString('     ');
        expect(res).toBe(false);
    });

    it('should allow stirng with non-space chars', () => {

        let res = isRealString('   mario ');
        expect(res).toBe(true);
    });
});