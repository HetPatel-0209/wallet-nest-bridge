
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { WalletAction } from "@/lib/types";
import { ArrowRightIcon, KeyIcon, PlusCircleIcon, WalletIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WalletAccess = () => {
  const { createWallet, accessWallet, importWallet } = useWallet();
  const [action, setAction] = useState<WalletAction>("access");
  const [password, setPassword] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (action === "create") {
      createWallet(password);
      navigate("/seed-phrase");
    } else if (action === "access") {
      accessWallet(password);
      navigate("/portfolio");
    } else if (action === "import") {
      importWallet(privateKey, password);
      navigate("/portfolio");
    }
  };

  return (
    <div className="wallet-container min-h-screen flex flex-col justify-center">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-3">
          <div className="bg-primary/10 p-4 rounded-full">
            <WalletIcon size={32} className="text-primary" />
          </div>
        </div>
        <h1 className="text-2xl font-bold">Wallet Nest Bridge</h1>
        <p className="text-muted-foreground mt-1">Your cross-network crypto wallet</p>
      </div>

      <div className="wallet-card mb-6">
        <div className="flex justify-between border-b border-border pb-4 mb-4">
          <button
            className={`flex-1 py-2 rounded-md transition-colors ${
              action === "access" ? "bg-primary/10 text-primary" : "hover:bg-muted"
            }`}
            onClick={() => setAction("access")}
          >
            Access
          </button>
          <button
            className={`flex-1 py-2 rounded-md transition-colors ${
              action === "create" ? "bg-primary/10 text-primary" : "hover:bg-muted"
            }`}
            onClick={() => setAction("create")}
          >
            Create
          </button>
          <button
            className={`flex-1 py-2 rounded-md transition-colors ${
              action === "import" ? "bg-primary/10 text-primary" : "hover:bg-muted"
            }`}
            onClick={() => setAction("import")}
          >
            Import
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {action === "access" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
          )}

          {action === "create" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Create Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters
                </p>
              </div>
            </div>
          )}

          {action === "import" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Private Key</label>
                <Input
                  type="password"
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  placeholder="Enter your private key"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Enter your wallet's private key (64 characters with 0x prefix)
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Create Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password for this wallet"
                  required
                />
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full flex items-center justify-center gap-2"
          >
            {action === "access" && (
              <>
                <KeyIcon size={16} />
                <span>Access Wallet</span>
                <ArrowRightIcon size={16} className="ml-1" />
              </>
            )}
            {action === "create" && (
              <>
                <PlusCircleIcon size={16} />
                <span>Create Wallet</span>
                <ArrowRightIcon size={16} className="ml-1" />
              </>
            )}
            {action === "import" && (
              <>
                <KeyIcon size={16} />
                <span>Import Wallet</span>
                <ArrowRightIcon size={16} className="ml-1" />
              </>
            )}
          </Button>
        </form>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Your keys, your crypto. Keep your private key safe.
      </p>
    </div>
  );
};

export default WalletAccess;
