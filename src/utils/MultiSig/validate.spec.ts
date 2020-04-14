import { isValidCompressedPublicKey, isAmountSignatureProper } from "./validate";


describe('Compressed Public Key Validation', () => {
    test('Non Hexadecimal String - Fail', () => {
        const expectedError = "It is not in hexadecimal format"

        const pubKey = "abc"

        const error = isValidCompressedPublicKey(pubKey).error;

        expect(error).toStrictEqual(expectedError);
    });

    test('Invalid Public Key - Fail', () => {
        const expectedError = "It is not a public key"

        const pubKey = "ff"

        const error = isValidCompressedPublicKey(pubKey).error;

        expect(error).toStrictEqual(expectedError);
    });

    test('Uncompressed Public Key - Fail', () => {
        const expectedError = "This public key is not a compressed public key."

        const pubKey = "04b60b406f45dd861949219baac64f6aa6ec7d2bf04735ab7caf35f34195762f6022dda6e39b5eeb68344e5d41f6896c6a85074964fd53549d081b0c748ab94a5d"

        const error = isValidCompressedPublicKey(pubKey).error;

        expect(error).toStrictEqual(expectedError);
    });

    test('Valid Public Key - Success', () => {
        const expectedValidity = true

        const pubKey = "02493b35d886843f3bbaee4669e2472737768a7b0c6f92dedea259e4d435a08375"

        const validity = isValidCompressedPublicKey(pubKey).valid;

        expect(validity).toStrictEqual(expectedValidity);
    });
})


describe('Signature Number Validation', () => {
    test('Too many signatures - Fail', () => {
        const expectedError = "Amount of signature should not be more than total number of public keys."

        const pubKeys = [
            "02493b35d886843f3bbaee4669e2472737768a7b0c6f92dedea259e4d435a08375",
            "02a9bb7f878a6b6da358db11267c8b89112db8e13f6979ff21ea339368273d9830",
            "02634213cb309c8b8656b2d78c5fdfd4424e24260fb4c8d4ce851918f0cfa48719",
            "03aa5c94b7d880e3b85690a9a086936bfc24e8b476ccf3197c72243cfc589f8ba8",
            "039b67a886d6ba8f8fd64b4cd092a0899bccb6db9b3a77d9a9568232d668bad1c9"
        ]

        const error = isAmountSignatureProper(10, pubKeys).error

        expect(error).toStrictEqual(expectedError);
    });

    test('Signatures more than 20 - Fail', () => {
        const expectedError = "Amount of signature should not be more than total number of public keys."

        const pubKeys = [
            "02493b35d886843f3bbaee4669e2472737768a7b0c6f92dedea259e4d435a08375",
            "02a9bb7f878a6b6da358db11267c8b89112db8e13f6979ff21ea339368273d9830",
            "02634213cb309c8b8656b2d78c5fdfd4424e24260fb4c8d4ce851918f0cfa48719",
            "03aa5c94b7d880e3b85690a9a086936bfc24e8b476ccf3197c72243cfc589f8ba8",
            "039b67a886d6ba8f8fd64b4cd092a0899bccb6db9b3a77d9a9568232d668bad1c9"
        ]

        const error = isAmountSignatureProper(20, pubKeys).error

        expect(error).toStrictEqual(expectedError);
    });

    test('0 Signature - Fail', () => {
        const expectedError = "At least one signature is needed."

        const pubKeys = [
            "02493b35d886843f3bbaee4669e2472737768a7b0c6f92dedea259e4d435a08375",
            "02a9bb7f878a6b6da358db11267c8b89112db8e13f6979ff21ea339368273d9830",
            "02634213cb309c8b8656b2d78c5fdfd4424e24260fb4c8d4ce851918f0cfa48719",
            "03aa5c94b7d880e3b85690a9a086936bfc24e8b476ccf3197c72243cfc589f8ba8",
            "039b67a886d6ba8f8fd64b4cd092a0899bccb6db9b3a77d9a9568232d668bad1c9"
        ]

        const error = isAmountSignatureProper(0, pubKeys).error

        expect(error).toStrictEqual(expectedError);
    });

    test('Valid Signature Number - Success', () => {
        const expectedValidity = true

        const pubKeys = [
            "02493b35d886843f3bbaee4669e2472737768a7b0c6f92dedea259e4d435a08375",
            "02a9bb7f878a6b6da358db11267c8b89112db8e13f6979ff21ea339368273d9830",
            "02634213cb309c8b8656b2d78c5fdfd4424e24260fb4c8d4ce851918f0cfa48719",
            "03aa5c94b7d880e3b85690a9a086936bfc24e8b476ccf3197c72243cfc589f8ba8",
            "039b67a886d6ba8f8fd64b4cd092a0899bccb6db9b3a77d9a9568232d668bad1c9"
        ]

        const validity = isAmountSignatureProper(3, pubKeys).valid

        expect(validity).toStrictEqual(expectedValidity);
    });    
})