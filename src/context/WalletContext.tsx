
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { 
  networks as initialNetworks,
  transactions, 
  wallet as dummyWallet,
  fetchNetworksData,
  fetchWalletBalance
} from "@/lib/dummy-data";
import { BlockchainNetwork, Transaction, Wallet } from "@/lib/types";
import { toast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";

interface WalletContextProps {
  wallet: Wallet | null;
  isAuthenticated: boolean;
  currentNetwork: BlockchainNetwork;
  transactions: Transaction[];
  networks: BlockchainNetwork[];
  seedPhrase: string[] | null;
  isLoading: boolean;
  createWallet: (password: string) => void;
  accessWallet: (password: string) => void;
  importWallet: (privateKey: string, password: string) => void;
  logout: () => void;
  switchNetwork: (networkId: string) => void;
  sendTransaction: (to: string, amount: number) => void;
  getBalance: () => number;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState<BlockchainNetwork>(initialNetworks[0]);
  const [networks, setNetworks] = useState<BlockchainNetwork[]>(initialNetworks);
  const [currentTransactions, setCurrentTransactions] = useState<Transaction[]>(transactions);
  const [seedPhrase, setSeedPhrase] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch networks data when the component mounts
  const { data: networksData, isLoading: isLoadingNetworks } = useQuery({
    queryKey: ['networks'],
    queryFn: fetchNetworksData,
    enabled: isAuthenticated,
  });

  // Update networks when the data is fetched
  useEffect(() => {
    if (networksData) {
      setNetworks(networksData);
      // If the current network isn't in the new networks list, default to the first one
      if (!networksData.find(n => n.id === currentNetwork.id)) {
        setCurrentNetwork(networksData[0]);
      }
    }
  }, [networksData, currentNetwork.id]);

  // Fetch wallet balance when the wallet or network changes
  const fetchWalletData = async () => {
    if (!wallet || !isAuthenticated) return;
    
    setIsLoading(true);
    try {
      const balance = await fetchWalletBalance(wallet.address, currentNetwork.id);
      setWallet({
        ...wallet,
        balance,
        network: currentNetwork
      });
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      toast({
        title: "Error",
        description: "Failed to fetch wallet balance",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh balance when network changes
  useEffect(() => {
    if (isAuthenticated && wallet) {
      fetchWalletData();
    }
  }, [currentNetwork.id, isAuthenticated]);

  const refreshBalance = async () => {
    await fetchWalletData();
  };

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

    // Start fetching network data and balance
    fetchWalletData();
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

    // Start fetching network data and balance
    fetchWalletData();
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

    // Start fetching network data and balance
    fetchWalletData();
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

      // Refresh wallet balance for the new network
      fetchWalletData();
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
    
    // Update wallet balance after sending
    if (wallet) {
      setWallet({
        ...wallet,
        balance: wallet.balance - amount
      });
    }
    
    toast({
      title: "Transaction Sent",
      description: `Sent ${amount} ${currentNetwork.symbol} to ${to.substring(0, 6)}...${to.substring(to.length - 4)}`,
    });
  };

  const getBalance = () => {
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
      isLoading: isLoading || isLoadingNetworks,
      createWallet,
      accessWallet,
      importWallet,
      logout,
      switchNetwork,
      sendTransaction,
      getBalance,
      refreshBalance
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
