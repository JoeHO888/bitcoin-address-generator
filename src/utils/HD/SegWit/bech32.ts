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

const CHARSET: string = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
const GENERATOR: number[] = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];

// Converted to Typescript
const polymod = (values: number[]): number => {
  let chk: number = 1;
  for (let p: number = 0; p < values.length; ++p) {
    let top: number = chk >> 25;
    chk = (chk & 0x1ffffff) << 5 ^ values[p];
    for (let i: number = 0; i < 5; ++i) {
      if ((top >> i) & 1) {
        chk ^= GENERATOR[i];
      }
    }
  }
  return chk;
}

// Converted to Typescript
const hrpExpand = (hrp: string): number[] => {

  let ret: number[] = [];
  for (let p: number = 0; p < hrp.length; ++p) {
    ret.push(hrp.charCodeAt(p) >> 5);
  }
  ret.push(0);
  for (let p: number = 0; p < hrp.length; ++p) {
    ret.push(hrp.charCodeAt(p) & 31);
  }
  return ret;
}

// Converted to Typescript
const verifyChecksum = (hrp: string, data: number[]): boolean => {
  return polymod(hrpExpand(hrp).concat(data)) === 1;
}

// Converted to Typescript
const createChecksum = (hrp: string, data: number[]): number[] => {
  let values: number[] = hrpExpand(hrp).concat(data).concat([0, 0, 0, 0, 0, 0]);
  let mod: number = polymod(values) ^ 1;
  let ret: number[] = [];
  for (let p: number = 0; p < 6; ++p) {
    ret.push((mod >> 5 * (5 - p)) & 31);
  }
  return ret;
}

// Converted to Typescript
const encodeBech32String = (hrp: string, data: number[]): string => {
  let combined: number[] = data.concat(createChecksum(hrp, data));
  let ret: string = hrp + '1';
  for (let p: number = 0; p < combined.length; ++p) {
    ret += CHARSET.charAt(combined[p]);
  }
  return ret;
}

export interface DecodedString {
  hrp: string;
  data: number[];
}

// Converted to Typescript
const decodeBech32String = (bechString: string): DecodedString | null => {
  let has_lower: boolean = false;
  let has_upper: boolean = false;
  for (let p: number = 0; p < bechString.length; ++p) {
    if (bechString.charCodeAt(p) < 33 || bechString.charCodeAt(p) > 126) {
      return null;
    }
    if (bechString.charCodeAt(p) >= 97 && bechString.charCodeAt(p) <= 122) {
      has_lower = true;
    }
    if (bechString.charCodeAt(p) >= 65 && bechString.charCodeAt(p) <= 90) {
      has_upper = true;
    }
  }
  if (has_lower && has_upper) {
    return null;
  }
  let bechStringLowerCase: string = bechString.toLowerCase();
  let pos: number = bechStringLowerCase.lastIndexOf('1');
  if (pos < 1 || pos + 7 > bechStringLowerCase.length || bechStringLowerCase.length > 90) {
    return null;
  }
  let hrp: string = bechStringLowerCase.substring(0, pos);
  let data: number[] = [];
  for (let p: number = pos + 1; p < bechStringLowerCase.length; ++p) {
    let d: number = CHARSET.indexOf(bechStringLowerCase.charAt(p));
    if (d === -1) {
      return null;
    }
    data.push(d);
  }
  if (!verifyChecksum(hrp, data)) {
    return null;
  }
  return { hrp: hrp, data: data.slice(0, data.length - 6) };
}

export {
  decodeBech32String,
  encodeBech32String,
};