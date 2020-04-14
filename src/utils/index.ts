import {
    generateMultiSigAddress,
    generateRedeemScript,
    isValidCompressedPublicKey,
    isAmountSignatureProper,
    validatePublicKeyObjArray,
    generateCompressedPublicKey
} from "./MultiSig";

import {
    deriveHDSegWitAddress,
    isMasterKeySeedValid,
    isDerivedPathValid,
    generateSeed
} from "./HD";


export {
    generateMultiSigAddress,
    generateRedeemScript,
    isValidCompressedPublicKey,
    isAmountSignatureProper,
    validatePublicKeyObjArray,
    generateCompressedPublicKey
};

export {
    deriveHDSegWitAddress,
    isMasterKeySeedValid,
    isDerivedPathValid,
    generateSeed
}
