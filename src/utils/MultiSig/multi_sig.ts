import { compileOpcodes } from "./opcode";
import {
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

export {
    generateRedeemScript
};
