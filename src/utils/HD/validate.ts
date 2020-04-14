
type seedValidation = {
    valid: boolean;
    error?: string
}

const isMasterKeySeedValid = (seed: string): seedValidation => {
    const seedBuffer: Buffer = Buffer.from(seed, "hex")

    let validationRes: seedValidation = { valid: true }

    if (seedBuffer.length < 16) {
        validationRes.valid = false
        validationRes.error = "Seed should be at least 128 bits";
    }

    if (seedBuffer.length > 64) {
        validationRes.valid = false
        validationRes.error = "Seed should be at most 512 bits";
    }

    return validationRes
}

export {
    isMasterKeySeedValid,
}