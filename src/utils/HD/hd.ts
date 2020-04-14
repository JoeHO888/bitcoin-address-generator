import * as ecc from "tiny-secp256k1";
import { isDerivedPathValid } from "./validate"
import { BIP32, generate_master_key } from "./bip32";


type nodeParameter = {
    index: number;
    ishardended: boolean;
}

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

const deriveNode = (childNodeParameterArray: nodeParameter[], masterNode: BIP32): BIP32 | null => {
    // Current Node is not null
    let currentNode: BIP32 | null = masterNode;

    for (let childNodeIndex = 0; childNodeIndex < childNodeParameterArray.length; childNodeIndex++) {
        let nodeIndex = childNodeParameterArray[childNodeIndex].index
        let ishardended = childNodeParameterArray[childNodeIndex].ishardended
        currentNode = (currentNode as BIP32).derive(nodeIndex, ishardended)

        if (currentNode == null) {
            return null
        }
    }

    return currentNode
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
    
    const nodeDerived = deriveNode(nodeParameterArray, masterNode);

    return
}

export {
    deriveHDSegWitAddress
}