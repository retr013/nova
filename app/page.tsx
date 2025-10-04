import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Nova</h1>
        <p className="text-xl text-muted-foreground">
          Solana WebSocket Demo with Phantom Wallet Integration
        </p>
        <div className="flex justify-center space-x-2">
          <Badge variant="secondary">Next.js</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">Solana</Badge>
          <Badge variant="secondary">WebSocket</Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🌌</span>
              <span>Cosmo</span>
            </CardTitle>
            <CardDescription>
              Live feed of new Solana tokens streaming from your Go backend
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Real-time WebSocket connection</li>
              <li>• Token metadata display</li>
              <li>• Duplicate prevention</li>
              <li>• Responsive card layout</li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/cosmo">View Live Feed</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>💸</span>
              <span>Transfer</span>
            </CardTitle>
            <CardDescription>
              Send SOL from your Phantom wallet with real-time USD pricing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Phantom wallet integration</li>
              <li>• Address validation</li>
              <li>• CoinGecko price API</li>
              <li>• Transaction signing</li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/transfer">Send SOL</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">1. Start Backend</h4>
              <p className="text-sm text-muted-foreground">
                Run your Go WebSocket server on <code className="bg-muted px-1 rounded">ws://127.0.0.1:8080/connect</code>
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">2. Connect Wallet</h4>
              <p className="text-sm text-muted-foreground">
                Use the wallet button in the header to connect your Phantom wallet
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
