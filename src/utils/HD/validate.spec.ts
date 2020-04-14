import { isMasterKeySeedValid, isDerivedPathValid } from "./validate";

describe('Master Key Seed Validation', () => {

    test('Non Hexadecimal String - Fail', () => {
        const expectedError = "Please provide hexadecimal string"

        const seed = "abc"

        const error = isMasterKeySeedValid(seed).error;

        expect(error).toStrictEqual(expectedError);
    }); 

    test('Short Seed - Fail', () => {
        const expectedError = "Seed should be at least 128 bits"

        const seed = "f".repeat(30)

        console.log(isMasterKeySeedValid(seed));
        const error = isMasterKeySeedValid(seed).error;

        expect(error).toStrictEqual(expectedError);
    });

    test('Long Seed - Fail', () => {
        const expectedError = "Seed should be at most 512 bits"

        const seed = "f".repeat(130) // >1 28

        const error = isMasterKeySeedValid(seed).error;

        expect(error).toStrictEqual(expectedError);
    });
    
    test('Valid Seed- Success', () => {
        const expectedValidity = true

        const seed = "a7c57a4b4851d6b43fcbbbfa988afbda39ac52feef4d0b647438e45d64a0e60c7633bf04fb610ef4ce1a7e1b1e29fab0da30b8cca3701f1773d0e5e1f650f836"

        const validity = isMasterKeySeedValid(seed).valid;

        expect(validity).toStrictEqual(expectedValidity);
    });     
})

describe('Derive Path Validation', () => {

    test('Bad formatted Derived Path 1 - Fail', () => {
        const expectedError = "Invalid Path, path should be something like m/15'/2"

        const path = "m'"

        const error = isDerivedPathValid(path).error;

        expect(error).toStrictEqual(expectedError);
    }); 

    test('Bad formatted Derived Path 2 - Fail', () => {
        const expectedError = "Invalid Path, path should be something like m/15'/2"

        const path = "m/zdf"

        const error = isDerivedPathValid(path).error;

        expect(error).toStrictEqual(expectedError);
    });   
    
    test('Bad formatted Derived Path 3 - Fail', () => {
        const expectedError = "Invalid Path, path should be something like m/15'/2"

        const path = "m/2/4'/5a"

        const error = isDerivedPathValid(path).error;

        expect(error).toStrictEqual(expectedError);
    });       

    
    test('Valid path 1- Success', () => {
        const expectedValidity = true

        const path = "m/2'/3"

        const validity = isDerivedPathValid(path).valid;

        expect(validity).toStrictEqual(expectedValidity);
    });
    
    test('Valid path 2- Success', () => {
        const expectedValidity = true

        const path = "m/212/3543'"

        const validity = isDerivedPathValid(path).valid;

        expect(validity).toStrictEqual(expectedValidity);
    });    
})