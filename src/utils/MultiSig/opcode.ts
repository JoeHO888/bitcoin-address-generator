import * as pushdata from "pushdata-bitcoin";
import { script } from "bitcoinjs-lib";

type StackElement = Buffer | number;
type Stack = StackElement[];

const asMinimalOP = (buffer: Buffer): number | undefined => {
    if (buffer.length === 0) return script.OPS.OP_0;
    if (buffer.length !== 1) return;
    if (buffer[0] >= 1 && buffer[0] <= 16) return script.OPS.OP_INT_BASE + buffer[0];
    if (buffer[0] === 0x81) return script.OPS.OP_1NEGATE;
}

const isBuffer = (buf: StackElement): boolean => {
    return Buffer.isBuffer(buf);
}

const compileOpcodes = (chunks: Stack): Buffer => {
    const bufferSize: number = chunks.reduce((accum: number, chunk: StackElement) => {
        // data chunk
        if (isBuffer(chunk)) {
            // adhere to BIP62.3, minimal push policy
            const chunkBuffer: Buffer = (chunk as Buffer);

            if (chunkBuffer.length === 1 && asMinimalOP(chunkBuffer) !== undefined) {
                return accum + 1;
            }
            return accum + pushdata.encodingLength(chunkBuffer.length) + chunkBuffer.length;
        }
        // opcode
        return accum + 1;
    }, 0.0);
    const buffer: Buffer = Buffer.allocUnsafe(bufferSize);
    let offset: number = 0;
    chunks.forEach(chunk => {
        // data chunk
        if (isBuffer(chunk)) {
            // adhere to BIP62.3, minimal push policy
            const chunkBuffer: Buffer = (chunk as Buffer);
            const opcode = asMinimalOP(chunkBuffer);
            if (opcode !== undefined) {
                buffer.writeUInt8(opcode, offset);
                offset += 1;
                return;
            }
            offset += pushdata.encode(buffer, chunkBuffer.length, offset);
            chunkBuffer.copy(buffer, offset);
            offset += chunkBuffer.length;
            // opcode
        } else {
            const chunkInteger: number = (chunk as number);
            buffer.writeUInt8(chunkInteger, offset);
            offset += 1;
        }
    });
    if (offset !== buffer.length) throw new Error('Could not decode chunks');
    return buffer;
}

export { compileOpcodes };