import { script } from "bitcoinjs-lib";

const compressedPublicKeyPrefix_1: string = "02";
const compressedPublicKeyPrefix_2: string = "03";
const OP_INT_BASE: number = script.OPS.OP_RESERVED;
const OP_CHECKMULTISIG: number = script.OPS.OP_CHECKMULTISIG;

export {
    compressedPublicKeyPrefix_1,
    compressedPublicKeyPrefix_2,
    OP_INT_BASE,
    OP_CHECKMULTISIG,
};