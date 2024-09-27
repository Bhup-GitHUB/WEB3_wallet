# Solana Keypair Generation from Mnemonic using BIP39 & Ed25519

This repository contains code that demonstrates how to generate Solana keypairs from a mnemonic phrase using the BIP39 standard and Ed25519 curve. This can be useful for Solana wallet generation, deriving multiple addresses, and cryptographic operations in blockchain development.

## How It Works

The code leverages several libraries to convert a mnemonic phrase (seed words) into keypairs. Here’s a breakdown of the steps:

1. **Mnemonic to Seed**: The mnemonic is converted into a seed using the `bip39` library’s `mnemonicToSeed` function.
2. **Derivation Path**: For each keypair, we use a specific derivation path following the BIP44 standard. The path is used to generate different keys from the same seed.
3. **Keypair Generation**: Using the Ed25519 curve, we derive secret and public keys from the seed.
4. **Solana Keypair**: We convert the Ed25519 key into a Solana-compatible keypair that can be used for signing transactions or interacting with the Solana blockchain.

## Libraries Used

- `tweetnacl`: A cryptographic library to handle keypair generation using the Ed25519 curve.
- `bip39`: Used to convert mnemonics (seed words) into seeds.
- `ed25519-hd-key`: Provides HD (Hierarchical Deterministic) key derivation using Ed25519.
- `@solana/web3.js`: Solana SDK for keypair management and blockchain interaction.

## Code Overview

```typescript
import nacl from "tweetnacl";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

const mnemonic = "proud cardle silly alpha swift swim speak suspect boring pink flash hotel";

(async () => {
    const seed: Buffer = await mnemonicToSeed(mnemonic);
    console.log(seed.toString('hex'));

    for (let i = 0; i < 4; i++) {
        const path = `m/44'/501'/${i}'/0'`;
        const { key }: { key: Buffer } = derivePath(path, seed.toString("hex"));

        const secret: Uint8Array = nacl.sign.keyPair.fromSeed(key).secretKey;
        const publicKey: string = Keypair.fromSecretKey(secret).publicKey.toBase58();
        console.log(publicKey);
    }
})();
