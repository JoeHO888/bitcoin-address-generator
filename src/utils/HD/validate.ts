
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

type derivedPathValidation = {
    valid: boolean;
    error?: string
}

const isDerivedPathValid = (path: string): derivedPathValidation => {

    let validationRes: derivedPathValidation = { valid: true }

    const pattern = new RegExp(/m(\/([0-9]+'{0,1}))*$/, "i")
    // const pattern = new RegExp("m(\/([0-9]+'{0,1}))*$");

    if (!pattern.test(path)) {
        validationRes.valid = false
        validationRes.error = "Invalid Path, path should be something like m/15'/2";
    }

    return validationRes
}

export {
    isMasterKeySeedValid,
    isDerivedPathValid
}