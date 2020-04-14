import {
    generateMultiSigAddress,
    generateRedeemScript,
    isValidCompressedPublicKey,
    isAmountSignatureProper,
    validatePublicKeyObjArray
} from "./MultiSig";

import {
    deriveHDSegWitAddress,
    isMasterKeySeedValid,
    isDerivedPathValid
} from "./HD";

export {
    generateMultiSigAddress,
    generateRedeemScript,
    isValidCompressedPublicKey,
    isAmountSignatureProper,
    validatePublicKeyObjArray
};

export {
    deriveHDSegWitAddress,
    isMasterKeySeedValid,
    isDerivedPathValid
}
