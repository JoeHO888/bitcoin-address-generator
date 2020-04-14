import * as ecc from "tiny-secp256k1";
import { isDerivedPathValid } from "./validate"
import { BIP32, generate_master_key } from "./bip32";

const isMasterKeyPairValid = (masterExtendedKeyPair: [Buffer, Buffer]): boolean => {
    const IL = masterExtendedKeyPair[0]
    return ecc.isPrivate(IL);
}

const deriveHDSegWitAddress = (seed: string, derivedPath: string) => {

    // check path valid
    const derivedPathValidation = isDerivedPathValid(derivedPath);

    // Check this seed can generate valid master key
    const masterExtendedKeyPair = generate_master_key(seed);

    if (!isMasterKeyPairValid(masterExtendedKeyPair)) {

        // Create error message

        // Return null node

    }

    // Create Master Node

    // Parse Path


    // Derive Node

    return
}

export {
    deriveHDSegWitAddress
}