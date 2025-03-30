
import { useWallet } from "@/context/WalletContext";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";

export default function NetworkSelector() {
  const { currentNetwork, networks, switchNetwork } = useWallet();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
      >
        <span className="text-lg">{currentNetwork.icon}</span>
        <span className="font-medium text-sm">{currentNetwork.name}</span>
        <ChevronDownIcon size={16} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-card shadow-lg rounded-lg border border-border z-50 animate-fade-in">
          <div className="py-1">
            {networks.map((network) => (
              <button
                key={network.id}
                className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-muted"
                onClick={() => {
                  switchNetwork(network.id);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{network.icon}</span>
                  <span>{network.name}</span>
                </div>
                {currentNetwork.id === network.id && (
                  <CheckIcon size={16} className="text-secondary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
