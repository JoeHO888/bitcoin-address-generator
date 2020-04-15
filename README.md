# Bitcoin Address Generator

A Web Application generate two types of Bitcoin Address

1. Hierarchical Deterministic Segregated Witness Address (HD Segwit)
2. Multiple Signature P2SH Address (MultiSig P2SH)

URL: https://naughty-hawking-10f012.netlify.com/

## Table of Contents
1. [Hierarchical Deterministic Segregated Witness Address (HD SegWit) Generator](#hd-segwit)
2. [Multiple Signature P2SH Address (MultiSig P2SH) Generator](#multisig-p2sh)
3. [How Seed & Compressed Public Key are generated](#seed-key-generation)
4. [Getting Started](#quickstart)
5. [Folder Structure](#folder-structure)
6. [Reference](#reference)

## Hierarchical Deterministic Segregated Witness Address (HD SegWit) Generator
Input: Seed (seed: Buffer, required, between 128 and 512 bits), Path (path: string, required, something like m/123/456'/789, ' denotes hardened child key)

path(m/i_0/i_1/i_2/.../i_L) can be interpreted as [i_0, i_1, i_2, ..., i_L], where i_k is the child key is number with/without ' (denoting hardened child key). 

Denote i_-1 as Master Private Key

Output: HD SegWit Address in P2WPKH format

Steps:
1. Generate I from HMAC-SHA512(Key = "Bitcoin seed", Data = seed)
2. Get [IL, IR] from spliting I into two parts, IL denotes the private key, IR denotes the chaincode
3. For each child key notation (i_k), 
- Create I from HMAC-SHA512(0x00 || i_k-1 || k) for hardened child key or I from HMAC-SHA512(i_k-1 || k) for normal child key
- Get [IL_k, IR_k] from spliting I into two parts, IL denotes the private key, IR denotes the chaincode for kth child key
- Get new child private Key from (IL_k + PrivateKey_k-1) (mod n)
- Return [PrivateKey_k, IR_k]
4. Obtain the [PrivateKey_L, IR_L]
5. Generate the correspond PublicKey_L from Step 4's PrivateKey_L
6. Covnert PublicKey_L to base32, base32PublicKey_L
7. Generate DataPart from [WitnessVersion] + [base32PublicKey_L], I uses 0 for WitnessVersion
8. Generate P2WPKH Address by applying Bech32 on DataPart with human-readable part, "bc" for mainnet, and "tb" for testnet

Remark:
1. SegWit is a standard to fix Nonintentional malleability and increase Transaction Per Second in Bitcoin, it does not enforce **any** address format, though there are a few native address format for SegWit (e.g. P2WPKH and P2WPKH nested in P2SH). This generator only support **P2WPKH**
2. I convert [source code](https://github.com/sipa/bech32/tree/master/ref/javascript) from Javascript to Typescript in Step 8
3. I reference and rewrite partial part of code from [source code](https://github.com/bitcoinjs/bitcoinjs-lib) on step 3 to step 6
4. I write Step 1, 2 and 7 solely

## Multiple Signature P2SH Address (MultiSig P2SH) Generator
Input: Compressed Public Keys (pubKeys: Buffer, required), Amount of signatures required to release the coins (m: number, required) 
Output: MultiSig P2SH Bitcoin Address & Corresponding Redeem Script

Steps:
1. Generate Redeem Script Opcodes from pubKeys & m, something like ```{OP_2 [pubkey1] [pubkey2] [pubkey3] OP_3 OP_CHECKMULTISIG}```
2. Compile the Redeem Script Opcodes to Reedeem Script, i.e. convert Redeem Script Opcodes to buffer
3. Obtain hash by applying hash160 on Reedeem Script
4. Prepend character 5 to hash to obtain new payload
5. Apply Base58check on new payload

Remark:
1. I extract and convert [source code](https://github.com/bitcoinjs/bitcoinjs-lib) from Javascript to Typescript in Step 2
2. Rewrite step 1 from BitcoinJS (bitcoinjs-lib), https://github.com/bitcoinjs/bitcoinjs-lib
3. Write steps 3,4,5 solely

## How Seed & Compressed Public Key are generated
This web app has built-in seed generation and compressed public key generation for HD SegWit Generator and MultiSig P2SH Generator separately. It uses Crypto, a Node JS built-in module, to create 32 byte (randomByte) randomly. 

1. randomByte is used as seed in HD SegWit Generator
2. randomByte serves as a private key and used to create corresponding compressed public key in MultiSig P2SH Generator

P.S. Due to time constraint, I do not create a canvas which allows user to draw something on it at this moment, the data can be used for creating an entropy for replacing randomByte.

## Getting Started

Install Dependencies

```
npm install
```

Start Web App

```
npm start
```

Test

```
npm test
```

## Folder Structure
    .
    ├── public                            # Static Files
    │   ├── image                         # Image Folder
    │   │   ├── home                      # Home Page Image
    ├── src                               # Source Code
    │   ├── components                    # Components
    │   ├── ├── Footer                    # Universal Footer   
    │   ├── ├── HDGenerator               # HD SegWit Generator 
    │   ├── ├── Header                    # Universal Header   
    │   ├── ├── Home                      # Home   
    │   ├── ├── MultiSigGenerator         # MultiSig P2SH Generator   
    │   ├── constant                      # Constants
    │   ├── ├── HDGenerator               # HD SegWit Constant  
    │   ├── ├── MultiSigGenerator         # MultiSig P2SH Constant   
    │   ├── utils                         # Helper Functions
    │   ├── ├── Common                    # Used by other scopes of helper functions  
    │   ├── ├── HD                        # HD SegWit Helper Function  
    │   ├── ├── MultiSig                  # MultiSig P2SH Helper Function  

Remark: .spec.ts or .spec.tsx files are Test Suites
## Reference

### HD SegWit
1. Hierarchical Deterministic Standard (BIP-32): https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki
2. Segregated Witness Standard (BIP-141)https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
3. Segregated Witness Address Standard (BIP-173): https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki#Segwit_address_format
4. Another Web App generating BIP32 Address: http://bip32.org/
5. Another Web App generating BIP32 Public Key & P2WPKH (Pay to Witness Public Key Hash): https://iancoleman.io/bip39/
6. Segwit Address Generator (Step by Step): https://bc-2.jp/tools/bech32demo/index.html

### MultiSig P2SH
1. M-of-N Standard Transactions(BIP-11): https://github.com/bitcoin/bips/blob/master/bip-0011.mediawiki
2. Pay to Script Hash Standard (BIP-16): https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki
3. BitcoinJS Source Code: https://github.com/bitcoinjs/bitcoinjs-lib
