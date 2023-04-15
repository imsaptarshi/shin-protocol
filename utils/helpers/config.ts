import { ChainId } from "@thirdweb-dev/react"
import abi from "../../contracts/Vouching/abi.json"
import NFTabi from "../../contracts/NFT/abi.json"

//weightage: [points, max_limit]

let config = {
    title: "Shin Protocol",
    description: "",
    chainId: 80001,
    chain: ChainId.Mumbai,
    vouchingContract: {
        address: "0x150Fb2845c16C6043e0AB72def6d7D15E3B00673",
        abi: abi
    },
    NFTContract: {
        address: "0x7529d1d1D978f24f4b6acc4022939b0c927Ed1b0",
        abi: NFTabi
    },
    weightage: {
        balance: 20,

        NFT_count: [15, 20],
        chain_history: {
            transaction_count: [20, 50],
            erc20_token_transactions: [10, 10],

        },
        tokens: <any>{
            MATIC: [10, 2],
            WETH: [10, 0.001],
            ETH: [10, 0.001],
            USDT: [10, 2],
            USDC: [10, 2],
            DAI: [10, 2],
            OTHERS: [5, 0.0001]
        },
        captcha: 10,
        vouching: 10,
        social: 10
    },

    allowed_erc20_tokens: ["WETH", "ETH", "MATIC", "USDT", "USDC", "SHIB", "BNB", "DAI", "HEX", "BUSD", "MKR", "LEO", "AAVE", "UNI", "WBTC", "CRO", "APE", "LINK", "WBTC", "TON", "GRT", "SAND", "ENS"],
    allowed_erc20_token_contracts: ["0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"]
}

export default config;