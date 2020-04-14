import * as ecc from "tiny-secp256k1";
import { isDerivedPathValid } from "./validate"
import { BIP32, generate_master_key } from "./bip32";

const isMasterKeyPairValid = (masterExtendedKeyPair: [Buffer, Buffer]): boolean => {
    const IL = masterExtendedKeyPair[0]
    return ecc.isPrivate(IL);
}

const pathToNodeParamtersArray = (derivedPath: string) => {
    const childNodePath = derivedPath.split("/").slice(1);
    
    return (
        childNodePath.map(
            (childNodeNotation) => {
                if (childNodeNotation.slice(-1) === "'") {
                    return { index: parseInt(childNodeNotation.slice(0, -1), 10), ishardended: true }
                }
                else {
                    return { index: parseInt(childNodeNotation, 10), ishardended: false }
                }
            }
        )
    )
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

    const masterNode = new BIP32(masterExtendedKeyPair[0], masterExtendedKeyPair[1]);

    // Parse Path

    const nodeParameterArray = pathToNodeParamtersArray(derivedPath);


    // Derive Node

    return
}

export {
    deriveHDSegWitAddress
}