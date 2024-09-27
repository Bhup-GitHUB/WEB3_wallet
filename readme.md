# Solana Web Wallet Generator

This project demonstrates how to generate Solana wallet addresses from a mnemonic phrase using TypeScript. It showcases the process of deriving multiple addresses from a single seed phrase, which is a common practice in hierarchical deterministic (HD) wallets.

## Features

- Generates a seed from a mnemonic phrase
- Derives multiple Solana addresses from a single seed
- Uses BIP39 and BIP44 standards for key derivation
- Implements ED25519 curve for Solana address generation

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine
- npm (Node Package Manager) installed

## Installation

To install the necessary dependencies, run the following command in your project directory:

```bash
npm install tweetnacl bip39 ed25519-hd-key @solana/web3.js
```

## Usage

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies as mentioned above.
4. Run the script using the following command:

```bash
npx ts-node your_script_name.ts
```

Replace `your_script_name.ts` with the actual name of your TypeScript file.

## Code Explanation

Here's a detailed breakdown of the main script:

```typescript
import nacl from "tweetnacl";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
```
These lines import the necessary libraries:
- `tweetnacl`: A cryptography library used for generating keypairs.
- `bip39`: Used for converting mnemonic phrases to seeds.
- `ed25519-hd-key`: Implements the hierarchical deterministic (HD) key derivation for ED25519 curve.
- `@solana/web3.js`: Solana's JavaScript API for interacting with Solana networks.

```typescript
const mnemonic = "proud cardle silly alpha swift swim speak suspect boring pink flash hotel";
```
This line defines the mnemonic phrase (seed phrase) used to generate the wallet. In a real application, this should be securely provided by the user, not hardcoded.

```typescript
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
```
This async IIFE (Immediately Invoked Function Expression) performs the following steps:
1. Converts the mnemonic to a seed using BIP39 standard.
2. Logs the seed in hexadecimal format.
3. Generates 4 different wallet addresses from the same seed:
   - Constructs a BIP44 derivation path for each address.
   - Derives a key from the seed using the path.
   - Generates an ED25519 keypair from the derived key.
   - Creates a Solana `Keypair` from the secret key.
   - Extracts and logs the public key (address) in Base58 format.

## Security Considerations

- The mnemonic phrase in this code is hardcoded for demonstration purposes. In a real-world application, you should never hardcode or expose your mnemonic phrase.
- Ensure proper security measures are in place when handling private keys and seeds in a production environment.
- Always use secure methods to generate and store mnemonic phrases and private keys.
- Consider implementing additional security features like encryption and secure key storage.

## Contributing

Contributions to this project are welcome. Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear, descriptive messages.
4. Push your changes to your fork.
5. Submit a pull request with a clear description of your changes.

## Disclaimer

This code is for educational purposes only. Use it at your own risk. Always ensure you understand the security implications when working with cryptocurrency wallets and private keys. This project is not audited and should not be used to manage real funds without proper review and security measures.

## Further Resources

- [Solana Documentation](https://docs.solana.com/)
- [BIP39 Standard](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- [BIP44 Standard](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
- [ED25519 Curve](https://ed25519.cr.yp.to/)

For any questions or issues, please open an issue in the GitHub repository.
