const signatureNumberOptions = Array.from(Array(21).keys()).slice(1);
const defaultPublicKeyInputText = "It starts from 02 or 03";
const initialPublicKeyElement = {
    "valid": true,
    "value": "",
    "hasError": false,
    "helperText": defaultPublicKeyInputText
};

const defaultSignatureNumberHelperText = "Amount of signatures required to release the coins";

export{
    signatureNumberOptions,
    defaultPublicKeyInputText,
    initialPublicKeyElement,
    defaultSignatureNumberHelperText
}