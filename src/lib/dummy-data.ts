import { BlockchainNetwork, Transaction, Wallet } from "./types";

export const networks: BlockchainNetwork[] = [
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    icon: "🔷",
    chainId: "1",
    rpcUrl: "https://mainnet.infura.io/v3/your-project-id",
    active: true,
  },
  {
    id: "binance",
    name: "Binance Smart Chain",
    symbol: "BNB",
    icon: "🟡",
    chainId: "56",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    active: false,
  },
  {
    id: "polygon",
    name: "Polygon",
    symbol: "MATIC",
    icon: "🟣",
    chainId: "137",
    rpcUrl: "https://polygon-rpc.com/",
    active: false,
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    icon: "🟪",
    chainId: "1",
    rpcUrl: "https://api.mainnet-beta.solana.com",
    active: false,
  },
  {
    id: "sweat",
    name: "SWEAT",
    symbol: "SWEAT",
    icon: "💧",
    chainId: "73772",
    rpcUrl: "https://rpc.sweateconomy.com",
    active: false,
  },
  {
    id: "dojima",
    name: "Dojima",
    symbol: "DOJ",
    icon: "🌊",
    chainId: "8",
    rpcUrl: "https://api.dojima.network/",
    active: false,
  },
];

export const wallet: Wallet = {
  id: "wallet-1",
  name: "Main Wallet",
  address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  balance: 2.5438,
  network: networks[0],
};

export const transactions: Transaction[] = [
  {
    id: "tx-1",
    type: "receive",
    amount: 0.5,
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: "completed",
    network: networks[0],
  },
  {
    id: "tx-2",
    type: "send",
    amount: 0.1,
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: "completed",
    network: networks[0],
  },
  {
    id: "tx-3",
    type: "receive",
    amount: 1.2,
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    status: "completed",
    network: networks[0],
  },
  {
    id: "tx-4",
    type: "send",
    amount: 0.05,
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    status: "completed",
    network: networks[0],
  },
];

// Seed phrase words (BIP39 compliant)
export const seedPhraseWords: string[] = [
  "abandon", "ability", "able", "about", "above", "absent",
  "absorb", "abstract", "absurd", "abuse", "access", "accident",
  "account", "accuse", "achieve", "acid", "acoustic", "acquire",
  "across", "act", "action", "actor", "actress", "actual",
  "adapt", "add", "addict", "address", "adjust", "admit",
  "adult", "advance", "advice", "aerobic", "affair", "afford",
  "afraid", "again", "age", "agent", "agree", "ahead",
  "aim", "air", "airport", "aisle", "alarm", "album",
  "alcohol", "alert", "alien", "all", "alley", "allow",
  "almost", "alone", "alpha", "already", "also", "alter",
  "always", "amateur", "amazing", "among", "amount", "amused",
];

// Function to generate a random seed phrase
export const generateSeedPhrase = (wordCount: number = 12): string[] => {
  const seedPhrase: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * seedPhraseWords.length);
    seedPhrase.push(seedPhraseWords[randomIndex]);
  }
  return seedPhrase;
};

// Function to simulate fetching network data from an API
export const fetchNetworksData = async (): Promise<BlockchainNetwork[]> => {
  // In a real implementation, this would be an API call
  // For now, we'll simulate a network delay and return our static data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(networks);
    }, 800);
  });
};

// Function to simulate fetching wallet balance
export const fetchWalletBalance = async (
  address: string, 
  networkId: string
): Promise<number> => {
  // In a real implementation, this would be an API call to the blockchain
  // For demonstration, we'll return different balances based on the network
  return new Promise((resolve) => {
    const networkMultipliers: Record<string, number> = {
      ethereum: 1,
      binance: 5.2,
      polygon: 421.5,
      solana: 12.8,
      sweat: 2500,
      dojima: 180.3
    };
    
    const multiplier = networkMultipliers[networkId] || 1;
    const baseBalance = 2.5438;
    
    setTimeout(() => {
      resolve(baseBalance * multiplier);
    }, 600);
  });
};
