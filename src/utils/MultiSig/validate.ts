import * as ecc from "tiny-secp256k1";

import {isStringHexadecimal} from "../Common";

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

const isValidCompressedPublicKey = (pubKey: string): publicKeyValidation => {
    let validationResult: publicKeyValidation = { valid: true };

    if (!isStringHexadecimal(pubKey)) {
        validationResult.valid = false;
        validationResult.error = "It is not in hexadecimal format"
        return validationResult
    }
    const pubKeyBuffer = Buffer.from(pubKey, "hex")

    if (!isValidPublicKey(pubKeyBuffer)) {
        validationResult.valid = false;
        validationResult.error = "It is not a public key"
        return validationResult
    }

    if (!isCompressedPublicKey(pubKeyBuffer)) {
        validationResult.valid = false;
        validationResult.error = "This public key is not a compressed public key."
        return validationResult
    }

    return validationResult;
}

type signatureAmountValidation = {
    valid: boolean;
    error?: string;
}

const isAmountSignatureProper = (m: number, pubKeys: string[]): signatureAmountValidation => {
    const validationResult: signatureAmountValidation = { valid: true };

    if (m < 1 && m > pubKeys.length) {
        validationResult.valid = false
        validationResult.error = "Amount of Signature should be less than total number of public keys."
    }

    if (m < 1 && m > 20) {
        validationResult.valid = true
        validationResult.error = "Amount of Signature should be less than 20."
    }
    return validationResult;
}

export {
    isValidCompressedPublicKey,
    isAmountSignatureProper
}