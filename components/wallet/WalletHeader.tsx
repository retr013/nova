"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WalletHeader() {
  const { connect, disconnect, connected, publicKey, wallet } = useWallet();
  const { setVisible } = useWalletModal();

  const handleWalletClick = () => {
    if (connected) {
      disconnect();
    } else {
      setVisible(true);
    }
  };

  const getButtonText = () => {
    if (connected && publicKey) {
      return `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}`;
    }
    return "Connect Wallet";
  };

  return (
    <header className="flex justify-between items-center p-4 border-b bg-background">
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-xl font-bold">
          Nova
        </Link>
        <nav className="flex space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/cosmo">Cosmo</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/transfer">Transfer</Link>
          </Button>
        </nav>
      </div>
      <Button 
        onClick={handleWalletClick}
        className="bg-black hover:bg-gray-800 text-white border-black hover:border-gray-800"
        variant="default"
      >
        {getButtonText()}
      </Button>
    </header>
  );
}
