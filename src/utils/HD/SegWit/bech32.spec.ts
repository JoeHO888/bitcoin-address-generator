import { decodeBech32String, encodeBech32String } from "./bech32";

describe('Bech32 Encoder', () => {
    test('Valid data', () => {
        const expectedBech32Encoded = "bc1q2huwllvxnr09m7wyxxycr2htznfeyfr8ykmx2a"
        const hrp = "bc";
        const data = [
            0, 10, 23, 28, 14, 31, 31, 12, 6,
            19, 3, 15, 5, 27, 30, 14, 4, 6,
            6, 4, 24, 3, 10, 23, 11, 2, 19,
            9, 25, 4, 9, 3, 7
        ]
        const bech32Encoded = encodeBech32String(hrp, data);

        expect(bech32Encoded).toStrictEqual(expectedBech32Encoded);
    });
})

describe('Bech32 Decoder', () => {

    test('Bech32 address contains lowercase & uppercase characters', () => {
        const expectedPayload = null
        const mixedCaseBech32Address = "bc1q2huwllvxnr09m7wyxxycr2htznfeyfr8ykmx2A"
        const decodedPayload = decodeBech32String(mixedCaseBech32Address);

        expect(decodedPayload).toStrictEqual(expectedPayload);
    });

    test('Bech32 address contains Special characters', () => {
        const expectedPayload = null
        const specialBech32Address = "bc".concat(String.fromCharCode(128)).concat("q2huwllvxnr09m7wyxxycr2htznfeyfr8ykmx2a")

        const decodedPayload = decodeBech32String(specialBech32Address);

        expect(decodedPayload).toStrictEqual(expectedPayload);
    });   

    test('Bech32 address does not contain separator', () => {
        const expectedPayload = null
        const noSeparatorBech32Address = "bc2q2huwllvxnr09m7wyxxycr2htznfeyfr8ykmx2A"
        const decodedPayload = decodeBech32String(noSeparatorBech32Address);

        expect(decodedPayload).toStrictEqual(expectedPayload);
    });

    test('Bech32 address too long', () => {
        const expectedPayload = null
        const longBech32Address = "bc1q2huwllvxnr09m7wyxxycr2htznfeyfr8ykmx2Aq2huwllvxnr09m7wyxxycr2htznfeyfr8ykmx2Aq2huwllvxnr09m7wyxxycr2htznfeyfr8ykmx2Aq2huwllvxnr09m7wyxxycr2htznfeyfr8ykmx2A"
        const decodedPayload = decodeBech32String(longBech32Address);

        expect(decodedPayload).toStrictEqual(expectedPayload);
    });

    test('Bech32 address too short', () => {
        const expectedPayload = null
        const shortBech32Address = "bc1q"
        const decodedPayload = decodeBech32String(shortBech32Address);

        expect(decodedPayload).toStrictEqual(expectedPayload);
    });    

    test('Bech32 address has wrong checksum', () => {
        const expectedPayload = null
        const wrongChecksumBech32Address = "bc1q2huwllvxnr09m7wyxxycr2htznfeyfr8ykmx2y"
        const decodedPayload = decodeBech32String(wrongChecksumBech32Address);

        expect(decodedPayload).toStrictEqual(expectedPayload);
    });

    test('Valid bech32 address', () => {
        const expectedPayload = {
            hrp: 'bc',
            data: [
                0, 10, 23, 28, 14, 31, 31, 12, 6,
                19, 3, 15, 5, 27, 30, 14, 4, 6,
                6, 4, 24, 3, 10, 23, 11, 2, 19,
                9, 25, 4, 9, 3, 7
            ]
        }
        const bech32Address = "bc1q2huwllvxnr09m7wyxxycr2htznfeyfr8ykmx2a"
        const decodedPayload = decodeBech32String(bech32Address);

        expect(decodedPayload).toStrictEqual(expectedPayload);
    });    
})