"use client";
import { useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface SolPrice {
  solana: {
    usd: number;
  };
}

export default function TransferPage() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [solPrice, setSolPrice] = useState<number | null>(null);
  const [showUsd, setShowUsd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSolPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );
        const data: SolPrice = await response.json();
        setSolPrice(data.solana.usd);
      } catch (error) {
        console.error("Failed to fetch SOL price:", error);
      }
    };

    fetchSolPrice();
    // Refresh price every 30 seconds
    const interval = setInterval(fetchSolPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  const validateSolAddress = (address: string): boolean => {
    try {
      new PublicKey(address);
      return true;
    } catch {
      return false;
    }
  };

  const handleTransfer = async () => {
    if (!publicKey) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!amount || !recipient) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!validateSolAddress(recipient)) {
      toast.error("Invalid Solana address");
      return;
    }

    const solAmount = parseFloat(amount);
    if (isNaN(solAmount) || solAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsLoading(true);

    try {
      const lamports = Math.floor(solAmount * LAMPORTS_PER_SOL);
      const recipientPubkey = new PublicKey(recipient);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubkey,
          lamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      
      toast.success(`Transaction sent! Signature: ${signature}`);
      
      // Clear form
      setAmount("");
      setRecipient("");
    } catch (error: any) {
      console.error("Transfer failed:", error);
      
      // Handle user rejection specifically
      if (error.message?.includes("User rejected") || 
          error.message?.includes("rejected") ||
          error.name === "UserRejectedRequestError") {
        toast.error("Transaction was rejected by user");
      } else {
        toast.error(`Transfer failed: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const usdValue = solPrice && amount ? Math.round((parseFloat(amount) * solPrice) *100)/100 : null;

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Transfer SOL</h1>
        <p className="text-muted-foreground">
          Send SOL from your Phantom wallet
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transfer Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount (SOL)</label>
            <Input
              type="number"
              step="0.1"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isLoading}
            />
            {usdValue && showUsd && (
              <p className="text-sm text-muted-foreground">
                ≈ ${usdValue} USD
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">To Wallet Address</label>
            <Input
              placeholder="Enter Solana address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              disabled={isLoading}
            />
            {recipient && !validateSolAddress(recipient) && (
              <p className="text-sm text-red-500">Invalid Solana address</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowUsd(!showUsd)}
              disabled={!solPrice}
            >
              {showUsd ? "Hide" : "Show"} USD
            </Button>
            {solPrice && (
              <Badge variant="secondary">
                1 SOL = ${solPrice.toFixed(2)}
              </Badge>
            )}
          </div>

          <Button
            onClick={handleTransfer}
            disabled={!publicKey || isLoading || !amount || !recipient || !validateSolAddress(recipient)}
            className="w-full"
          >
            {isLoading ? "Sending..." : "Send SOL"}
          </Button>

          {!publicKey && (
            <p className="text-sm text-muted-foreground text-center">
              Connect your Phantom wallet to send SOL
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
