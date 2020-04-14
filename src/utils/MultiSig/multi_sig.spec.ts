import { generateRedeemScript, generateMultiSigAddress } from "./multi_sig";


test('Redeem Script Generation', () => {
    const expectedReedemScript = "532102493b35d886843f3bbaee4669e2472737768a7b0c6f92dedea259e4d435a083752102a9bb7f878a6b6da358db11267c8b89112db8e13f6979ff21ea339368273d98302102634213cb309c8b8656b2d78c5fdfd4424e24260fb4c8d4ce851918f0cfa487192103aa5c94b7d880e3b85690a9a086936bfc24e8b476ccf3197c72243cfc589f8ba821039b67a886d6ba8f8fd64b4cd092a0899bccb6db9b3a77d9a9568232d668bad1c955ae"

    const pubKeys = [
        "02493b35d886843f3bbaee4669e2472737768a7b0c6f92dedea259e4d435a08375",
        "02a9bb7f878a6b6da358db11267c8b89112db8e13f6979ff21ea339368273d9830",
        "02634213cb309c8b8656b2d78c5fdfd4424e24260fb4c8d4ce851918f0cfa48719",
        "03aa5c94b7d880e3b85690a9a086936bfc24e8b476ccf3197c72243cfc589f8ba8",
        "039b67a886d6ba8f8fd64b4cd092a0899bccb6db9b3a77d9a9568232d668bad1c9"
    ]

    const m = 3

    const redeemScript = generateRedeemScript(pubKeys, m)

    expect(redeemScript.toString("hex")).toStrictEqual(expectedReedemScript)
});

test('MultiSig Generation', () => {
    const expectedAddress = "3MkUZA1tQLTKG7skmBGBtWHNPazuCRFZLp";

    const redeemScript = Buffer.from("532102493b35d886843f3bbaee4669e2472737768a7b0c6f92dedea259e4d435a083752102a9bb7f878a6b6da358db11267c8b89112db8e13f6979ff21ea339368273d98302102634213cb309c8b8656b2d78c5fdfd4424e24260fb4c8d4ce851918f0cfa487192103aa5c94b7d880e3b85690a9a086936bfc24e8b476ccf3197c72243cfc589f8ba821039b67a886d6ba8f8fd64b4cd092a0899bccb6db9b3a77d9a9568232d668bad1c955ae", 
    "hex")

    const address = generateMultiSigAddress(redeemScript);

    expect(address).toStrictEqual(expectedAddress);
}); 
