// Copyright (c) 2017 Pieter Wuille
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import { DecodedString, encodeBech32String, decodeBech32String } from "./bech32";
import { hash160 } from "../../Common";

// Witness Version
const witVer: number = 0;

// Bit Conversion
const fromBits: number = 8;
const toBits: number = 5;

// Bit Conversion with padding
// Converted to Typescript
const convertbits = (data: Buffer, frombits: number, tobits: number, pad: boolean): number[] | null => {
    let acc: number = 0;
    let bits: number = 0;
    let ret: number[] = [];
    let maxv: number = (1 << tobits) - 1;
    for (let p: number = 0; p < data.length; ++p) {
        let value = data[p];

        // Check byte is valid
        if (value < 0 || (value >> frombits) !== 0) {
            return null;
        }

        acc = (acc << frombits) | value;
        bits += frombits;
        while (bits >= tobits) {
            bits -= tobits;
            ret.push((acc >> bits) & maxv);
        }
    }
    if (pad) {
        if (bits > 0) {
            ret.push((acc << (tobits - bits)) & maxv);
        }
    } else if (bits >= frombits || ((acc << (tobits - bits)) & maxv)) {
        return null;
    }
    return ret;
}

interface DecodedAddr {
    version: number;
    program: number[]
}

// Converted to Typescript
const decode = (hrp: string, addr: string): DecodedAddr | null => {
    let dec: DecodedString | null = decodeBech32String(addr);
    if (dec === null || dec.hrp !== hrp || dec.data.length < 1 || dec.data[0] > 16) {
        return null;
    }
    const witnessProgramExtracted = Buffer.from(dec.data.slice(1));
    let res: number[] | null = convertbits(witnessProgramExtracted, 5, 8, false);
    if (res === null || res.length < 2 || res.length > 40) {
        return null;
    }
    if (dec.data[0] === 0 && res.length !== 20 && res.length !== 32) {
        return null;
    }
    return { version: dec.data[0], program: res };
}

// Converted to Typescript
const encode = (hrp: string, dataPart: number[]): string | null => {
    let ret: string = encodeBech32String(hrp, dataPart);
    if (decode(hrp, ret) === null) {
        return null;
    }
    return ret;
}

const convertToSegwit = (pubKeyStr: string) => {
    // Public Key Buffer
    const pubKeyBuffer = Buffer.from(pubKeyStr, 'hex');
    // Witness Program = Hash 160 of Public Key
    const witProgram = hash160(pubKeyBuffer)
    const base32WitProgram = convertbits(witProgram, fromBits, toBits, true);
    const dataPart = [witVer].concat((base32WitProgram) as number[])
    const segWitAddress = encode("bc", dataPart);

    return segWitAddress
}

export {
    convertToSegwit
};