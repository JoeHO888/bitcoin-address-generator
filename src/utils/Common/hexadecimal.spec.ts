import { isStringHexadecimal } from "./hexadecimal";

describe('Hexadecimal', () => {
    test('Odd Number Length Fail', () => {
        const expectedRes = false
        const string = "1";

        const res = isStringHexadecimal(string)

        expect(res).toStrictEqual(expectedRes);
    });

    test('Non 0-9 & a-f characters Fail', () => {
        const expectedRes = false
        const string = "z123";

        const res = isStringHexadecimal(string)

        expect(res).toStrictEqual(expectedRes);
    });

    test('Arbitrary String Fail', () => {
        const expectedRes = false
        const string = "213 fsdg";

        const res = isStringHexadecimal(string)

        expect(res).toStrictEqual(expectedRes);
    });    

    test('Hexadecimal - Success', () => {
        const expectedRes = true
        const string = "ff";

        const res = isStringHexadecimal(string)

        expect(res).toStrictEqual(expectedRes);
    });  
})
