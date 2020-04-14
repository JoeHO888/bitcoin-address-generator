import { randomBytes } from "crypto";

const generate256Bit = (): Buffer => {
    // const curveOrder = "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141"
    const bigIntBuf = randomBytes(32);

    // const bigIntString = (parseInt(bigInt.toString("hex"), 16) % parseInt(curveOrder, 16) + 1).toString(16)
    // const bit256Buf = Buffer.from(bigIntString, "hex");
    return bigIntBuf
}

export {
    generate256Bit
}