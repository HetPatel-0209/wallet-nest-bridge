
export type WalletAction = 'create' | 'access' | 'import';

export interface Wallet {
  id: string;
  name: string;
  address: string;
  balance: number;
  network: BlockchainNetwork;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: number;
  address: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
  network: BlockchainNetwork;
}

export interface BlockchainNetwork {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  chainId: string;
  rpcUrl: string;
  active: boolean;
}
