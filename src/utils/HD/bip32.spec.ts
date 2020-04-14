import { BIP32, generate_master_key } from "./bip32";

describe('Master Key Generation', () => {
    test('Valid Seed', () => {
        const expectedIL = Buffer.from("0a5fb838f6b80af1f9f34b0448e0d9c9437f5538840b3801a1d3a30d8b3e711f", "hex");
        const expectedIR = Buffer.from("94c9ed6a55ef8b8c74867eeb8797ab3e232e0f82be9b42876de2aabf4d1bc1ff", "hex");

        const validSeed = "fe".repeat(64);
        const extendedMasterKeyPair = generate_master_key(validSeed);

        expect(extendedMasterKeyPair).toStrictEqual([expectedIL, expectedIR]);
    });
})

describe('BIP32', () => {
    test('Proper Attributes', () => {
        const privateKey = Buffer.from("0a5fb838f6b80af1f9f34b0448e0d9c9437f5538840b3801a1d3a30d8b3e711f", "hex");
        const chainCode = Buffer.from("94c9ed6a55ef8b8c74867eeb8797ab3e232e0f82be9b42876de2aabf4d1bc1ff", "hex");
        const publicKey = Buffer.from("03b540850724158ec01a7919322af8a686ebcfcc27097600188fff27ae50a228f2", "hex")

        const expectedBip32Properties = {
            privateKey: privateKey,
            chainCode: chainCode,
            publicKey: publicKey
        }

        const bip32 = new BIP32(privateKey, chainCode);

        const testBip32Properties = {
            privateKey: bip32.privateKey,
            chainCode: bip32.chainCode,
            publicKey: bip32.publicKey
        }
        expect(testBip32Properties).toStrictEqual(expectedBip32Properties);
    });

    test('Derive Normal Child Key', () => {
        const expectedPublicKey = Buffer.from("022eb5f8d64e0d4b630e3689610c8b1e1c760d996280d929b4f2aaa25bf1406aa4", "hex");

        const privateKey = Buffer.from("0a5fb838f6b80af1f9f34b0448e0d9c9437f5538840b3801a1d3a30d8b3e711f", "hex");
        const chainCode = Buffer.from("94c9ed6a55ef8b8c74867eeb8797ab3e232e0f82be9b42876de2aabf4d1bc1ff", "hex");

        const bip32 = new BIP32(privateKey, chainCode);

        const normalChildNode = bip32.derive(2, false)?.derive(3, false);
        expect(normalChildNode?.publicKey).toStrictEqual(expectedPublicKey);
    });

    test('Derive Hardened Child Key', () => {
        const expectedPublicKey = Buffer.from("03ea327e466740912df4dc8cf01fd2856c1526445ec5e23df5a0e970fa51b12547", "hex");

        const privateKey = Buffer.from("0a5fb838f6b80af1f9f34b0448e0d9c9437f5538840b3801a1d3a30d8b3e711f", "hex");
        const chainCode = Buffer.from("94c9ed6a55ef8b8c74867eeb8797ab3e232e0f82be9b42876de2aabf4d1bc1ff", "hex");

        const bip32 = new BIP32(privateKey, chainCode);

        const hardenedChildNode = bip32.derive(2, false)?.derive(3, true);

        expect(hardenedChildNode?.publicKey).toStrictEqual(expectedPublicKey);
    });
})