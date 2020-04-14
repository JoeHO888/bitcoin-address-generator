import * as ecc from "tiny-secp256k1"
import { generate256Bit } from "../Common"

const generateCompressedPublicKey = () => {
    const bit256 = generate256Bit();
    return ecc.pointFromScalar(bit256, true);
}

export{
    generateCompressedPublicKey
}