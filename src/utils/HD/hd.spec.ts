import { deriveHDSegWitAddress } from "./hd";

describe('Derive HD SegWit Address', () => {
    test('Valid Seed & Path', () => {
        const expectedAddress = "bc1qcth35eyw4tdmxnrvgcvpeacnj8764q0fdxqjcg"

        const seed = "6d6d1917249e0f6c1d581322410d6b4393121d41709480e7922012eb534e7c7126b0a63cacf1bed9a1011f54db71398e1eae9ed346beea6b1d28ea8502a7cd06"
        const path = "m/15'/2/1'"

        const address = deriveHDSegWitAddress(seed, path).address;

        expect(address).toStrictEqual(expectedAddress);
    });
})