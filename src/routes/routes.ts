const routes = {
    "home": {
        "title": "Bitcoin Address Generator",
        "description": "Generate HD SegWit & MultiSig P2SH Address",
        "route": "/"
    },
    "hdSegWit": {
        "title": "Hierarchical Deterministic Segregated Witness Address (HD Segwit) Generator",
        "description": "Generate Hierarchical Deterministic Segregated Witness P2WPKH Address from a seed and path",
        "route": "/hd-generator",
        "imagePath":"/image/home/hd.jpg",
        "methodologyURL": "https://github.com/JoeHO888/bitcoin-address-generator#hierarchical-deterministic-segregated-witness-address-hd-segwit-generator"
    },
    "multiSig": {
        "title": "Multiple Signature P2SH Address (MultiSig P2SH) Generator",
        "description": "Generate Multiple Signature Address from compressed public keys",
        "route": "/multisig-generator",
        "imagePath":"/image/home/multisig.jpg",
        "methodologyURL": "https://github.com/JoeHO888/bitcoin-address-generator#multiple-signature-p2sh-address-multisig-p2sh-generator"
    }
}

export { routes }
