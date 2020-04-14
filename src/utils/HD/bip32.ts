import * as ecc from "tiny-secp256k1";
import { hmacSHA512 } from "../Common";

const HIGHEST_BIT: number = 0x80000000;

interface BIP32 {
    privateKey: Buffer;
    chainCode: Buffer;
    publicKey: Buffer
}

interface ExtendedPrivateKey {
    privateKey: Buffer;
    chainCode: Buffer;
}

class BIP32 {
    constructor(privateKey: Buffer, chainCode: Buffer) {
        this.privateKey = privateKey;
        this.chainCode = chainCode;
        this.publicKey = ecc.pointFromScalar(this.privateKey, true);
    }

    private handleHardenKey(index: number, isHardened: boolean): Buffer {
        const data: Buffer = Buffer.allocUnsafe(37);
        // Normal child
        if (isHardened) {
            // data = 0x00 || ser256(kpar) || ser32(index)
            data[0] = 0x00;
            this.privateKey.copy(data, 1);
            // Increment index by 2^31
            data.writeUInt32BE(index + HIGHEST_BIT, 33);

        }
        // Hardened child
        else {
            // data = serP(point(kpar)) || ser32(index)
            //      = serP(Kpar) || ser32(index)
            this.publicKey.copy(data, 0);
            data.writeUInt32BE(index, 33);
        }
        return data
    }

    private createExtendedPrivateKeyPair(index: number, isHardened: boolean): ExtendedPrivateKey | null {
        const data: Buffer = this.handleHardenKey(index, isHardened);

        const I: Buffer = hmacSHA512(this.chainCode, data);
        const IL: Buffer = I.slice(0, 32);
        const IR: Buffer = I.slice(32);

        const derivedPrivateKey: Buffer = ecc.privateAdd(this.privateKey, IL);

        // Invalid IL or Invalid private key
        if (!ecc.isPrivate(IL) || parseInt(derivedPrivateKey.toString('hex'), 16) === 0) {
            return null;
        }
        return { privateKey: derivedPrivateKey, chainCode: IR };
    }

    public derive(index: number, isHardened: boolean): BIP32 | null {
        const extendedPrivateKey = this.createExtendedPrivateKeyPair(index, isHardened);

        if (extendedPrivateKey) {
            return new BIP32(extendedPrivateKey.privateKey, extendedPrivateKey.chainCode);
        }
        else {
            return null;
        }

    }
}

const generate_master_key = (seed: string): [Buffer, Buffer] => {
    const seedBuffer = Buffer.from(seed, "hex");

    const I = hmacSHA512(Buffer.from('Bitcoin seed', 'utf8'), seedBuffer);
    const IL = I.slice(0, 32);
    const IR = I.slice(32);

    return [IL, IR];
}

export { BIP32, generate_master_key };