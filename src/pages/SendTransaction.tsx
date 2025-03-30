
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWallet } from "@/context/WalletContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, ScanIcon, SendIcon } from "lucide-react";

const SendTransaction = () => {
  const { currentNetwork, sendTransaction, getBalance } = useWallet();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const balance = getBalance();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient.startsWith("0x") || recipient.length !== 42) {
      setError("Please enter a valid recipient address");
      return;
    }
    
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    
    if (amountValue > balance) {
      setError("Insufficient balance");
      return;
    }
    
    sendTransaction(recipient, amountValue);
    navigate("/portfolio");
  };
  
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
        <h1 className="text-xl font-semibold">Send {currentNetwork.symbol}</h1>
      </div>
      
      <div className="wallet-card mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Recipient Address</label>
            <div className="relative">
              <Input
                value={recipient}
                onChange={(e) => {
                  setRecipient(e.target.value);
                  setError("");
                }}
                placeholder={`Enter ${currentNetwork.name} address`}
                className="pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                title="Scan QR code"
              >
                <ScanIcon size={18} />
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Amount</label>
              <span className="text-xs text-muted-foreground">
                Balance: {balance} {currentNetwork.symbol}
              </span>
            </div>
            <div className="relative">
              <Input
                type="number"
                step="any"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError("");
                }}
                placeholder={`0.00 ${currentNetwork.symbol}`}
                className="pr-16"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 text-xs"
                onClick={() => setAmount(balance.toString())}
              >
                MAX
              </Button>
            </div>
          </div>
          
          {error && (
            <div className="text-sm text-destructive">
              {error}
            </div>
          )}
          
          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2"
              disabled={!recipient || !amount}
            >
              <SendIcon size={16} />
              <span>Send {currentNetwork.symbol}</span>
            </Button>
          </div>
        </form>
      </div>
      
      <div className="text-center text-sm text-muted-foreground">
        Transactions cannot be reversed after they are confirmed.
      </div>
    </div>
  );
};

export default SendTransaction;
