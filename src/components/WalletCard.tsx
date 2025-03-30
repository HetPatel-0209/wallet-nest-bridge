
import { useWallet } from "@/context/WalletContext";
import { CopyIcon, ExternalLinkIcon, WalletIcon } from "lucide-react";

export default function WalletCard() {
  const { wallet, currentNetwork } = useWallet();
  
  if (!wallet) return null;

  // Convert ETH to rupees (mock conversion)
  const exchangeRate = 250000; // 1 ETH = 250,000 INR
  const balanceInRupees = wallet.balance * exchangeRate;

  const copyAddress = () => {
    navigator.clipboard.writeText(wallet.address);
  };

  return (
    <div className="wallet-card wallet-gradient">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <WalletIcon className="mr-2" size={20} />
          <h2 className="font-semibold">{wallet.name}</h2>
        </div>
        <div className="bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
          {currentNetwork.name}
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-white/70 mb-1">Public Address</p>
          <div className="flex items-center bg-white/10 rounded-lg p-2 text-sm">
            <p className="flex-1 font-mono truncate">
              {wallet.address}
            </p>
            <button 
              onClick={copyAddress}
              className="ml-2 p-1 hover:bg-white/10 rounded"
              title="Copy address"
            >
              <CopyIcon size={16} />
            </button>
            <a 
              href={`https://etherscan.io/address/${wallet.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 p-1 hover:bg-white/10 rounded"
              title="View on explorer"
            >
              <ExternalLinkIcon size={16} />
            </a>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-white/70 mb-1">Balance</p>
          <div className="space-y-1">
            <p className="text-2xl font-bold">{wallet.balance} {currentNetwork.symbol}</p>
            <p className="text-md text-white/70">₹{balanceInRupees.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
