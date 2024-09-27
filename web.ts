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
