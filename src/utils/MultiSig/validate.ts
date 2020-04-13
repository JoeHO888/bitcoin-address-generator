import * as ecc from "tiny-secp256k1";

import {
    compressedPublicKeyPrefix_1,
    compressedPublicKeyPrefix_2,
} from "./constant";

const isCompressedPublicKey = (pubKey: Buffer): boolean => {
    const pubKeyString = pubKey.toString("hex");
    const isCompressed: boolean = pubKeyString.startsWith(compressedPublicKeyPrefix_1) ||
        pubKeyString.startsWith(compressedPublicKeyPrefix_2);
    return isCompressed;
}

const isValidPublicKey = (pubKey: Buffer): boolean => {
    return ecc.isPoint(pubKey);
}

type publicKeyValidation = {
    valid: boolean;
    error?: string;
}

const isValidCompressedPublicKey = (pubKey: Buffer): publicKeyValidation => {
    let validationResult: publicKeyValidation = { valid: true };
    if (!isValidPublicKey(pubKey)) {
        validationResult.valid = false;
        validationResult.error = "It is not a public key"
    }

    if (!isCompressedPublicKey(pubKey)) {
        validationResult.valid = false;
        validationResult.error = "This public key is not a compressed public key."
    }
    
    return validationResult;
}

export {
    isValidCompressedPublicKey,
}