import * as bs58check from "bs58check";

import { hash160 } from "../Common";
import { compileOpcodes } from "./opcode";
import {
    addressLength,
    addressPrefix,
    OP_INT_BASE,
    OP_CHECKMULTISIG,
} from "./constant";

const generateRedeemScriptOpcode = (pubKeys: Buffer[], m: number): (Buffer | number)[] => {
    const opcodes: (Buffer | number)[] = [];
    return opcodes.concat(OP_INT_BASE + m, pubKeys, OP_INT_BASE + pubKeys.length, OP_CHECKMULTISIG);
}

const generateRedeemScript = (pubKeys: string[], m: number): Buffer => {
    const pubKeyBufferArray: Buffer[] = pubKeys.map(pubKey => Buffer.from(pubKey, 'hex'));
    // Create redeemScriptOpcode
    const redeemScriptOpcodes = generateRedeemScriptOpcode(pubKeyBufferArray, m);
    // Convert Opcode to Redeem Script
    const redeemScript = compileOpcodes(redeemScriptOpcodes);
    return redeemScript
}

const generateMultiSigAddress = (redeemScript: Buffer): string => {
    const redeemScriptHash: Buffer = hash160(redeemScript);
    const payload: Buffer = Buffer.allocUnsafe(addressLength);

    payload.writeUInt8(addressPrefix, 0);
    redeemScriptHash.copy(payload, 1);

    const multiSigAddress: string = bs58check.encode(payload);
    return multiSigAddress;
}

export {
    generateRedeemScript,
    generateMultiSigAddress
};
