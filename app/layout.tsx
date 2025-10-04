import "./globals.css";
import { SolanaProvider } from "@/components/wallet/SolanaProvider";
import { Toaster } from "@/components/ui/sonner";
import WalletHeader from "@/components/wallet/WalletHeader";



export const metadata = {
  title: "Cosmo Task",
  description: "Solana + WebSocket Demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SolanaProvider>
          <WalletHeader/>
          <main className="container mx-auto p-6">{children}</main>
          <Toaster />
        </SolanaProvider>
      </body>
    </html>
  );
}
