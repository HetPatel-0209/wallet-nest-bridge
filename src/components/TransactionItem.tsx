
import { Transaction } from "@/lib/types";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { format } from "date-fns";

interface TransactionItemProps {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  return (
    <div className="transaction-item">
      <div className="flex items-center justify-center w-10 h-10 rounded-full mr-3">
        {transaction.type === "receive" ? (
          <div className="p-2 rounded-full bg-secondary/20 text-secondary">
            <ArrowDownIcon size={20} />
          </div>
        ) : (
          <div className="p-2 rounded-full bg-destructive/20 text-destructive">
            <ArrowUpIcon size={20} />
          </div>
        )}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <span className="font-medium">
            {transaction.type === "receive" ? "Received" : "Sent"}
          </span>
          <span className={`font-semibold ${
            transaction.type === "receive" ? "text-secondary" : "text-destructive"
          }`}>
            {transaction.type === "receive" ? "+" : "-"}
            {transaction.amount} {transaction.network.symbol}
          </span>
        </div>
        
        <div className="flex justify-between text-sm text-muted-foreground mt-1">
          <span className="truncate w-32">
            {transaction.type === "receive" ? "From: " : "To: "}
            {transaction.address.substring(0, 6)}...
            {transaction.address.substring(transaction.address.length - 4)}
          </span>
          <span>{format(transaction.timestamp, "MMM d, yyyy")}</span>
        </div>
      </div>
    </div>
  );
}
