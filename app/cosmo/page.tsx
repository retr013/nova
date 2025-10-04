"use client";
import { useWebSocketFeed } from "@/hooks/useWebSocket";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function CosmoPage() {
  const { feed, clear } = useWebSocketFeed();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Cosmo</h1>
          <p className="text-muted-foreground">
            Live feed of new Solana tokens
          </p>
        </div>
        <Button onClick={clear} variant="outline">
          Clear Feed
        </Button>
      </div>

      <div className="grid gap-4">
        {feed.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <p className="text-muted-foreground">
                  Waiting for new tokens...
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          feed.map((token, index) => (
            <Card key={`${token.mint}-${index}`} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={token.logo} alt={token.symbol} />
                    <AvatarFallback>
                      {token.symbol?.slice(0, 2).toUpperCase() || "??"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {token.name || "Unknown Token"}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      {token.symbol && (
                        <Badge variant="secondary">{token.symbol}</Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {token.decimals && `${token.decimals} decimals`}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Mint Address:
                    </p>
                    <p className="text-sm font-mono break-all font-bold">
                      {token.mint}
                    </p>
                  </div>
                  {token.supply && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Supply
                      </p>
                      <p className="text-sm">
                        {Number(token.supply).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
