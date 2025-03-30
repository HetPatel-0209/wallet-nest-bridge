
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { ArrowLeftIcon, CopyIcon, Share2Icon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReceiveTransaction = () => {
  const { wallet, currentNetwork } = useWallet();
  const [hasCopied, setHasCopied] = useState(false);
  const navigate = useNavigate();
  
  if (!wallet) return null;
  
  const copyAddress = () => {
    navigator.clipboard.writeText(wallet.address);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };
  
  // In a real app, we would generate this QR code dynamically
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${wallet.address}`;
  
  return (
    <div className="wallet-container min-h-screen py-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/portfolio")}
          className="mr-2"
        >
          <ArrowLeftIcon size={20} />
        </Button>
        <h1 className="text-xl font-semibold">Receive {currentNetwork.symbol}</h1>
      </div>
      
      <div className="wallet-card mb-6">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <img 
              src={qrCodeUrl} 
              alt="Wallet Address QR Code" 
              className="w-48 h-48"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2 text-center">
            Your {currentNetwork.name} Address
          </p>
          <div className="flex items-center bg-muted/50 rounded-lg p-2.5 border border-border">
            <p className="flex-1 font-mono text-xs text-center truncate">
              {wallet.address}
            </p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button 
            className="flex-1 flex items-center justify-center gap-2"
            onClick={copyAddress}
          >
            <CopyIcon size={16} />
            <span>{hasCopied ? "Copied!" : "Copy"}</span>
          </Button>
          
          <Button 
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2"
            onClick={() => {
              // In a real app, we would use the Web Share API
              alert("Share functionality would open here");
            }}
          >
            <Share2Icon size={16} />
            <span>Share</span>
          </Button>
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="font-medium">Important</h3>
        <p className="text-sm text-muted-foreground">
          Only send {currentNetwork.name} ({currentNetwork.symbol}) to this address. Sending any other asset may result in permanent loss.
        </p>
      </div>
    </div>
  );
};

export default ReceiveTransaction;
