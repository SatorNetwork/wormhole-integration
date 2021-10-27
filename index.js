import * as wormhole from "@certusone/wormhole-sdk";
import * as web3 from "@solana/web3.js";
import { ethers } from "ethers";
import {Buffer} from "buffer";

// ############################## ETHEREUM CONSTANTS ##############################
const TEST_WALLET_ETH_ADDR  = "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1"; // Key: 0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d Mnemonic myth like bonus scare over problem client lizard pioneer submit female collect
const TEST_ERC20_ETH_ADDR   = "0x2D8BE6BF0baA74e0A907016679CaE9190e80dD0A"; // Tokens minted to Test Wallet
const TEST_NFT_ETH_ADDR     = "0x5b9b42d6e4B2e4Bf8d42Eba32D46918e10899B66"; // One minted to Test Wallet
const TEST_WETH_ETH_ADDR    = "0xDDb64fE46a91D46ee29420539FC25FD07c5FEa3E"; // Tokens minted to Test Wallet
const BRIDGE_CORE_ETH_ADDR  = "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550";
const TOKEN_BRIDGE_ETH_ADDR = "0x0290FB167208Af455bB137780163b7B7a9a10C16";
const NFT_BRIDGE_ETH_ADDR   = "0x26b4afb60d6c903165150c6f0aa14f8016be4aec";
// ############################## ETHEREUM CONSTANTS ##############################

// ############################## SOLANA CONSTANTS ##############################
const TEST_WALLET_SOL_ADDR        = "6sbzC1eH4FTujJXWj51eQe25cYvr4xfXbJ1vAj7j2k5J"; // Key in solana/keys/solana-devnet.json
const EXAMPLE_TOKEN_SOL_ADDR      = "2WDq7wSs9zYrpx2kbHDA4RUTRch2CCTP6ZWaH4GNfnQQ"; // Tokens minted to Test Wallet
const EXAMPLE_NFT_SOL_ADDR        = "BVxyYhm498L79r4HMQ9sxZ5bi41DmJmeWZ7SCS7Cyvna"; // One minted to Test Wallet
const EXAMPLE_NFT2_SOL_ADDR       = "nftMANh29jbMboVnbYt1AUAWFP9N4Jnckr9Zeq85WUs";  // One minted to Test Wallet
const BRIDGE_CORE_SOL_ADDR        = "Bridge1p5gheXUvJ6jGWGeCsgPKgnE3YgdGKRVCMY9o";
const TOKEN_BRIDGE_SOL_ADDR       = "B6RHG3mfcckmrYN1UhmJzyS1XX3fZKbkeUcpJe9Sy3FE";
const NFT_BRIDGE_SOL_ADDR         = "NFTWqJR8YnRVqPDvTJrYuLrQDitTG5AScqbeghi4zSA";
const MIGRATION_CONTRACT_SOL_ADDR = "Ex9bCdVMSfx7EzB3pgSi2R4UHwJAXvTw18rBQm5YQ8gK";

const TEST_WALLET_SOL_SK = Uint8Array.from([
    14,173,153,4,176,224,201,111,32,237,183,185,159,247,22,161,89,84,215,209,212,137,
    10,92,157,49,29,192,101,164,152,70,87,65,8,174,214,157,175,126,98,90,54,24,100,
    177,247,77,19,112,47,44,165,109,233,102,14,86,109,29,134,145,132,141,
]);
// ############################## SOLANA CONSTANTS ##############################

function signTransaction(tx) {
    let keypair = web3.Keypair.fromSecretKey(TEST_WALLET_SOL_SK);
    tx.partialSign(keypair);

    return tx
}

async function attest() {
    const ATTEST_FROM_ETH          = false;
    const GET_SIGNED_VAA           = false; // TODO: UNSUPPORTED
    const POST_VAA_SOLANA          = false;
    const CREATE_WRAPPED_ON_SOLANA = true;

    // If you don't specify a //url//, Ethers connects to the default
    // (i.e. ``http:/\/localhost:8545``)
    const provider = new ethers.providers.JsonRpcProvider();

    // The provider also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, we need the account signer...
    const signer = provider.getSigner();

    const connection = new web3.Connection(
        'http://localhost:8899',
        'confirmed',
    );

    if (ATTEST_FROM_ETH) {
        const ETH_TOKEN_BRIDGE_ADDRESS = TOKEN_BRIDGE_ETH_ADDR;
        const tokenAddress = TEST_ERC20_ETH_ADDR;
        const ETH_BRIDGE_ADDRESS = BRIDGE_CORE_ETH_ADDR;

        // Submit transaction - results in a Wormhole message being published
        const receipt = await wormhole.attestFromEth(
            ETH_TOKEN_BRIDGE_ADDRESS,
            signer,
            tokenAddress
        );
        // Get the sequence number and emitter address required to fetch the signedVAA of our message
        const sequence = wormhole.parseSequenceFromLogEth(receipt, ETH_BRIDGE_ADDRESS);
        const emitterAddress = wormhole.getEmitterAddressEth(ETH_TOKEN_BRIDGE_ADDRESS);

        console.log("SEQUENCE", sequence);
        console.log("EMITTER_ADDRESS", emitterAddress);
        console.log("ATTEST_FROM_ETH: SUCCESS");
    }

    // if (GET_SIGNED_VAA) {
    //     // Fetch the signedVAA from the Wormhole Network (this may require retries while you wait for confirmation)
    //     const {signedVAA} = await getSignedVAA(
    //         WORMHOLE_RPC_HOST,
    //         CHAIN_ID_ETH,
    //         emitterAddress,
    //         sequence
    //     );
    // }

    const signedVAA = Buffer.from([1, 0, 0, 0, 0, 1, 0, 232, 83, 137, 68, 142, 198, 198, 219, 165, 242, 37, 249, 177, 41, 2, 114, 6, 113, 61, 178, 146, 240, 243, 51, 92, 210, 144, 18, 161, 137, 179, 162, 70, 97, 77, 100, 231, 194, 196, 36, 2, 97, 255, 98, 230, 217, 221, 45, 219, 220, 212, 212, 6, 204, 92, 217, 115, 230, 30, 70, 143, 39, 59, 119, 1, 0, 0, 1, 134, 204, 46, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 144, 251, 22, 114, 8, 175, 69, 91, 177, 55, 120, 1, 99, 183, 183, 169, 161, 12, 22, 0, 0, 0, 0, 0, 0, 0, 0, 15, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 45, 139, 230, 191, 11, 170, 116, 224, 169, 7, 1, 102, 121, 202, 233, 25, 14, 128, 221, 10, 0, 2, 18, 84, 75, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 116, 104, 101, 114, 101, 117, 109, 32, 84, 101, 115, 116, 32, 84, 111, 107, 101, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    if (POST_VAA_SOLANA) {
        const SOL_BRIDGE_ADDRESS = BRIDGE_CORE_SOL_ADDR;
        const payerAddress = TEST_WALLET_SOL_ADDR;

        // On Solana, we have to post the signedVAA ourselves
        await wormhole.postVaaSolana(
            connection,
            signTransaction,
            SOL_BRIDGE_ADDRESS,
            payerAddress,
            signedVAA
        );

        console.log("POST_VAA_SOLANA: SUCCESS");
    }

    if (CREATE_WRAPPED_ON_SOLANA) {
        const SOL_BRIDGE_ADDRESS = BRIDGE_CORE_SOL_ADDR;
        const SOL_TOKEN_BRIDGE_ADDRESS = TOKEN_BRIDGE_SOL_ADDR;
        const payerAddress = TEST_WALLET_SOL_ADDR;

        // Finally, create the wrapped token
        const transaction = await wormhole.createWrappedOnSolana(
            connection,
            SOL_BRIDGE_ADDRESS,
            SOL_TOKEN_BRIDGE_ADDRESS,
            payerAddress,
            signedVAA
        );
        const signed = await signTransaction(transaction);
        const txid = await connection.sendRawTransaction(signed.serialize());
        const resp = await connection.confirmTransaction(txid);

        console.log("TXID", txid);
        console.log("RESP", resp);
        console.log("CREATE_WRAPPED_ON_SOLANA: SUCCESS");
    }
}

async function transfer() {
    const TRANSFER_FROM_ETH = false;
    const GET_SIGNED_VAA    = false; // TODO: UNSUPPORTED
    const POST_VAA_SOLANA   = false;
    const REDEEM_ON_SOLANA  = true;

    // If you don't specify a //url//, Ethers connects to the default
    // (i.e. ``http:/\/localhost:8545``)
    const provider = new ethers.providers.JsonRpcProvider();

    // The provider also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, we need the account signer...
    const signer = provider.getSigner();

    const connection = new web3.Connection(
        'http://localhost:8899',
        'confirmed',
    );

    if (TRANSFER_FROM_ETH) {
        const ETH_TOKEN_BRIDGE_ADDRESS = TOKEN_BRIDGE_ETH_ADDR;
        const tokenAddress = TEST_ERC20_ETH_ADDR;
        const amount = 1;
        const CHAIN_ID_SOLANA = 1;
        let recipientAddress = new Uint8Array([
            87, 65, 8, 174, 214, 157, 175, 126, 98, 90, 54, 24, 100, 177, 247, 77, 19, 112, 47, 44, 165, 109, 233, 102, 14,
            86, 109, 29, 134, 145, 132, 141,
        ]);
        const ETH_BRIDGE_ADDRESS = BRIDGE_CORE_ETH_ADDR;

        // Submit transaction - results in a Wormhole message being published
        const receipt = await wormhole.transferFromEth(
            ETH_TOKEN_BRIDGE_ADDRESS,
            signer,
            tokenAddress,
            amount,
            CHAIN_ID_SOLANA,
            recipientAddress
        );
        // Get the sequence number and emitter address required to fetch the signedVAA of our message
        const sequence = wormhole.parseSequenceFromLogEth(receipt, ETH_BRIDGE_ADDRESS);
        const emitterAddress = wormhole.getEmitterAddressEth(ETH_TOKEN_BRIDGE_ADDRESS);

        console.log("SEQUENCE", sequence);
        console.log("EMITTER_ADDRESS", emitterAddress);
        console.log("TRANSFER_FROM_ETH: SUCCESS");
    }

    // if (GET_SIGNED_VAA) {
    //     // Fetch the signedVAA from the Wormhole Network (this may require retries while you wait for confirmation)
    //     const {signedVAA} = await getSignedVAA(
    //         WORMHOLE_RPC_HOST,
    //         CHAIN_ID_ETH,
    //         emitterAddress,
    //         sequence
    //     );
    // }

    const signedVAA = Buffer.from([1, 0, 0, 0, 0, 1, 0, 154, 247, 193, 97, 60, 8, 187, 58, 12, 208, 5, 215, 76, 180, 244, 214, 64, 156, 220, 40, 53, 138, 173, 176, 241, 42, 193, 164, 207, 118, 202, 154, 90, 18, 49, 7, 224, 105, 186, 148, 240, 207, 223, 162, 238, 197, 206, 190, 2, 212, 210, 25, 134, 201, 8, 18, 144, 238, 74, 40, 113, 194, 157, 21, 0, 0, 0, 2, 212, 241, 133, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 144, 251, 22, 114, 8, 175, 69, 91, 177, 55, 120, 1, 99, 183, 183, 169, 161, 12, 22, 0, 0, 0, 0, 0, 0, 0, 1, 15, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 45, 139, 230, 191, 11, 170, 116, 224, 169, 7, 1, 102, 121, 202, 233, 25, 14, 128, 221, 10, 0, 2, 87, 65, 8, 174, 214, 157, 175, 126, 98, 90, 54, 24, 100, 177, 247, 77, 19, 112, 47, 44, 165, 109, 233, 102, 14, 86, 109, 29, 134, 145, 132, 141, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    if (POST_VAA_SOLANA) {
        const SOL_BRIDGE_ADDRESS = BRIDGE_CORE_SOL_ADDR;
        const payerAddress = TEST_WALLET_SOL_ADDR;

        // On Solana, we have to post the signedVAA ourselves
        await wormhole.postVaaSolana(
            connection,
            signTransaction,
            SOL_BRIDGE_ADDRESS,
            payerAddress,
            signedVAA
        );

        console.log("POST_VAA_SOLANA: SUCCESS");
    }

    if (REDEEM_ON_SOLANA) {
        const SOL_BRIDGE_ADDRESS = BRIDGE_CORE_SOL_ADDR;
        const SOL_TOKEN_BRIDGE_ADDRESS = TOKEN_BRIDGE_SOL_ADDR;
        const payerAddress = TEST_WALLET_SOL_ADDR;

        // Finally, redeem on Solana
        const transaction = await wormhole.redeemOnSolana(
            connection,
            SOL_BRIDGE_ADDRESS,
            SOL_TOKEN_BRIDGE_ADDRESS,
            payerAddress,
            signedVAA,
            // isSolanaNative,
            // mintAddress
        );
        const signed = await signTransaction(transaction);
        console.log("SIGNED", signed);
        const txid = await connection.sendRawTransaction(signed.serialize());
        await connection.confirmTransaction(txid);

        console.log("REDEEM_ON_SOLANA: SUCCESS");
    }
}

// attest()
transfer()
