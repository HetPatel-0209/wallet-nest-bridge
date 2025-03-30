
import { useWallet } from "@/context/WalletContext";
import WalletCard from "@/components/WalletCard";
import TransactionItem from "@/components/TransactionItem";
import { Button } from "@/components/ui/button";
import { LogOutIcon, SendIcon } from "lucide-react";
import NetworkSelector from "@/components/NetworkSelector";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
  const { transactions, logout } = useWallet();
  const navigate = useNavigate();

  return (
    <div className="wallet-container min-h-screen py-6">
      <div className="flex justify-between items-center mb-6">
        <NetworkSelector />
        <Button 
          variant="ghost" 
          size="icon"
          onClick={logout}
          title="Log out"
        >
          <LogOutIcon size={20} />
        </Button>
      </div>
      
      <WalletCard />
      
      <div className="flex justify-between items-center mt-6 mb-4">
        <Button 
          className="flex-1 mr-2 bg-secondary hover:bg-secondary/90"
          onClick={() => navigate("/receive")}
        >
          Receive
        </Button>
        <Button 
          className="flex-1 ml-2"
          onClick={() => navigate("/send")}
        >
          Send
        </Button>
      </div>
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-lg">Transaction History</h2>
          <Button variant="link" size="sm" className="text-sm text-muted-foreground">
            View All
          </Button>
        </div>
        
        <div className="wallet-card">
          {transactions.length > 0 ? (
            <div className="divide-y divide-border">
              {transactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <SendIcon size={36} className="mx-auto mb-3 opacity-50" />
              <p>No transactions yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
