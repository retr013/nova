"use client";
import React, { FC, useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";

interface Props { children: React.ReactNode; }

export const SolanaProvider: FC<Props> = ({ children }) => {
  // const network = WalletAdapterNetwork.Devnet;
  // // For UI and normal ops use cluster url
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const endpoint = useMemo(
    () => "https://devnet.helius-rpc.com/?api-key=0f803376-0189-4d72-95f6-a5f41cef157d",
    []
  );

  // Only Phantom required for this task, but keep array for flexibility
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
