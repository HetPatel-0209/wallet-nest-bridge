import React, { createContext, useContext, useState, ReactNode } from "react";
import { networks, transactions, wallet as dummyWallet } from "@/lib/dummy-data";
import { BlockchainNetwork, Transaction, Wallet } from "@/lib/types";
import { toast } from "@/components/ui/use-toast";

interface WalletContextProps {
  wallet: Wallet | null;
  isAuthenticated: boolean;
  currentNetwork: BlockchainNetwork;
  transactions: Transaction[];
  networks: BlockchainNetwork[];
  seedPhrase: string[] | null;
  createWallet: (password: string) => void;
  accessWallet: (password: string) => void;
  importWallet: (privateKey: string, password: string) => void;
  logout: () => void;
  switchNetwork: (networkId: string) => void;
  sendTransaction: (to: string, amount: number) => void;
  getBalance: () => number;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState<BlockchainNetwork>(networks[0]);
  const [currentTransactions, setCurrentTransactions] = useState<Transaction[]>(transactions);
  const [seedPhrase, setSeedPhrase] = useState<string[] | null>(null);

  const createWallet = (password: string) => {
    // In a real app, we would generate a wallet using ethers.js or similar
    // For now, we'll just simulate it
    const generatedSeedPhrase = Array(12).fill("").map(
      (_, i) => ["abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract", "absurd", "abuse", "access", "accident"][i]
    );
    
    setSeedPhrase(generatedSeedPhrase);
    setWallet(dummyWallet);
    setIsAuthenticated(true);
    
    toast({
      title: "Wallet Created",
      description: "Your wallet has been created successfully!",
    });
  };

  const accessWallet = (password: string) => {
    // In a real app, we would verify the password
    // For now, we'll just simulate it
    setWallet(dummyWallet);
    setIsAuthenticated(true);
    setSeedPhrase(null);
    
    toast({
      title: "Wallet Accessed",
      description: "Welcome back!",
    });
  };

  const importWallet = (privateKey: string, password: string) => {
    // In a real app, we would import the wallet using the private key
    // For now, we'll just simulate it with dummy data
    // In a production app, this would use a library like ethers.js to
    // derive the wallet from the private key
    
    if (!privateKey.startsWith("0x") || privateKey.length !== 66) {
      toast({
        title: "Invalid Private Key",
        description: "Please enter a valid private key",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate deriving wallet from private key
    const importedWallet = {
      ...dummyWallet,
      name: "Imported Wallet",
      // In a real implementation, we would derive the address from the private key
      address: `0x${privateKey.substring(6, 46)}`,
    };
    
    setWallet(importedWallet);
    setIsAuthenticated(true);
    setSeedPhrase(null);
    
    toast({
      title: "Wallet Imported",
      description: "Your wallet has been imported successfully!",
    });
  };

  const logout = () => {
    setWallet(null);
    setIsAuthenticated(false);
    setSeedPhrase(null);
    
    toast({
      title: "Logged Out",
      description: "You have been logged out.",
    });
  };

  const switchNetwork = (networkId: string) => {
    const network = networks.find(n => n.id === networkId);
    if (network) {
      setCurrentNetwork(network);
      
      toast({
        title: "Network Switched",
        description: `Switched to ${network.name}`,
      });
    }
  };

  const sendTransaction = (to: string, amount: number) => {
    // In a real app, we would send the transaction using ethers.js or similar
    // For now, we'll just simulate it
    const newTransaction: Transaction = {
      id: `tx-${currentTransactions.length + 1}`,
      type: "send",
      amount,
      address: to,
      timestamp: new Date(),
      status: "completed",
      network: currentNetwork,
    };
    
    setCurrentTransactions([newTransaction, ...currentTransactions]);
    
    toast({
      title: "Transaction Sent",
      description: `Sent ${amount} ${currentNetwork.symbol} to ${to.substring(0, 6)}...${to.substring(to.length - 4)}`,
    });
  };

  const getBalance = () => {
    // In a real app, we would get the balance from the blockchain
    return wallet ? wallet.balance : 0;
  };

  return (
    <WalletContext.Provider value={{
      wallet,
      isAuthenticated,
      currentNetwork,
      transactions: currentTransactions,
      networks,
      seedPhrase,
      createWallet,
      accessWallet,
      importWallet,
      logout,
      switchNetwork,
      sendTransaction,
      getBalance
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
