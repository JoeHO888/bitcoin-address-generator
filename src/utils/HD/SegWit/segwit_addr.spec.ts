import { convertToSegwit } from "./segwit_addr";

describe('SegWit Address Conversion', () => {
    test('Public Key To SegWit Address', () => {
        const expectedAddress = "bc1qqyvap6mtxqsa7w953ejl7dx95zdrudvsy7tppj"

        const pubKey = "02b9aa71b0ccb05a20eda6f225c15fe8805dc9d878967cc2ba646a0dd8647845d3"

        const address = convertToSegwit(pubKey);

        expect(address).toStrictEqual(expectedAddress);
    });
})