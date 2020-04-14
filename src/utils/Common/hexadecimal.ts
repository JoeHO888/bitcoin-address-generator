const isStringHexadecimal = (string: string): boolean => {
    const lowerCaseString = string.toLowerCase();
    const pattern = new RegExp(/([0-9a-f])+$/, "i")
    return !isNaN(parseInt(lowerCaseString, 16))
        && lowerCaseString.length % 2 === 0
        && pattern.test(lowerCaseString);
}

export { isStringHexadecimal }