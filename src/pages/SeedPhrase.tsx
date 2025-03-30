
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { useState } from "react";
import { generateSeedPhrase } from "@/lib/dummy-data";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon, CopyIcon, ShieldAlertIcon } from "lucide-react";

const SeedPhrase = () => {
  const { seedPhrase } = useWallet();
  const [hasCopied, setHasCopied] = useState(false);
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const navigate = useNavigate();

  // Use real seed phrase from context or generate a dummy one for preview
  const displaySeedPhrase = seedPhrase || generateSeedPhrase(12);

  const handleCopy = () => {
    navigator.clipboard.writeText(displaySeedPhrase.join(" "));
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handleContinue = () => {
    navigate("/portfolio");
  };

  return (
    <div className="wallet-container min-h-screen flex flex-col justify-center py-10">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Your Seed Phrase</h1>
        <p className="text-muted-foreground mt-1">
          Write down or copy these words in the exact order
        </p>
      </div>

      <Alert variant="destructive" className="mb-6">
        <ShieldAlertIcon className="h-5 w-5" />
        <AlertTitle>Keep this private!</AlertTitle>
        <AlertDescription>
          Anyone with this seed phrase can access your wallet and funds. Never share it with anyone.
        </AlertDescription>
      </Alert>

      <div className="wallet-card mb-6">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {displaySeedPhrase.map((word, index) => (
            <div
              key={index}
              className="bg-muted/50 p-2 rounded-md border border-border flex items-center"
            >
              <span className="text-muted-foreground text-xs mr-2">{index + 1}.</span>
              <span className="font-medium">{word}</span>
            </div>
          ))}
        </div>

        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2"
          onClick={handleCopy}
        >
          {hasCopied ? (
            <>
              <CheckCircle2Icon size={16} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <CopyIcon size={16} />
              <span>Copy to Clipboard</span>
            </>
          )}
        </Button>
      </div>

      <div className="wallet-card mb-6">
        <div className="flex items-start mb-4">
          <input
            type="checkbox"
            id="confirm"
            className="mr-3 mt-1"
            checked={hasConfirmed}
            onChange={(e) => setHasConfirmed(e.target.checked)}
          />
          <label htmlFor="confirm" className="text-sm">
            I understand that if I lose my seed phrase, I will not be able to recover my wallet
          </label>
        </div>

        <Button 
          className="w-full"
          onClick={handleContinue}
          disabled={!hasConfirmed}
        >
          Continue to My Wallet
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Store your seed phrase in a secure location, like a password manager or a physical safe.
      </p>
    </div>
  );
};

export default SeedPhrase;
