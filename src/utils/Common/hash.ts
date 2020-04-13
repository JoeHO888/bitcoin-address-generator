import { createHash, createHmac } from "crypto";

const sha256 = (buffer: Buffer): Buffer => {
    return createHash('sha256')
        .update(buffer)
        .digest();
}

// Algorithm Name depends on OpenSSL on the platform
const ripemd160 = (buffer: Buffer): Buffer => {
    try {
        return createHash('rmd160')
            .update(buffer)
            .digest();
    } catch (err) {
        return createHash('ripemd160')
            .update(buffer)
            .digest();
    }
}

const hash160 = (buffer: Buffer): Buffer => {
    return ripemd160(sha256(buffer));
}

const hmacSHA512 = (key: Buffer, data: Buffer) => {
    return createHmac('sha512', key)
        .update(data)
        .digest();
}

export {
    hmacSHA512,
    hash160
};