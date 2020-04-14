import { hash160, hmacSHA512 } from "./hash";

describe('Hash Function', () => {
    test('HMACSHA512', () => {
        const expectedRes = "7b64ede1549750f9a0ee5afaffa25791a7f62779275a52a18c1ffb079258c64f2acce39a83fa7a624d366eb6fe2e529345dc059a009949e6370fb7046406551a";
        const expectedResBuffer = Buffer.from(expectedRes, "hex");

        const input = "c4cb2d6200c4734ca28b02462e9c210b3c5213f6bf56726ec0e75cd625c57add3ae6bd4d5293571915f9628357d5cc83c85b8a26fb052c3be135cc7f6efc206a";
        const inputBuffer = Buffer.from(input, "hex");
        const resBuffer = hmacSHA512(Buffer.from('Bitcoin seed', 'utf8'), inputBuffer);

        expect(resBuffer).toStrictEqual(expectedResBuffer);
    });
    
    test('Hash160', () => {
        const expectedRes = "3357200342a5e146638fd8a3be69df2bb08b394b";
        const expectedResBuffer = Buffer.from(expectedRes, "hex");

        const input = "5221026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e012102c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b92103c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e953ae";
        const inputBuffer = Buffer.from(input, "hex");
        const resBuffer = hash160(inputBuffer);

        expect(resBuffer).toStrictEqual(expectedResBuffer);
    });
})
