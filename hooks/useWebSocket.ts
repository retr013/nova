import { useEffect, useRef, useState } from "react";

export type TokenMessage = {
  mint: string;
  name?: string;
  symbol?: string;
  logo?: string;
  [k: string]: any;
};

export function useWebSocketFeed(url = "ws://127.0.0.1:8080/connect") {
  const [feed, setFeed] = useState<TokenMessage[]>([]);
  const websocketRef = useRef<WebSocket | null>(null);
  const attemptsRef = useRef(0);

  useEffect(() => {
    let mounted = true;

    function connect() {
      attemptsRef.current++;
      const ws = new WebSocket(url);
      websocketRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected");
        attemptsRef.current = 0;
      };

      ws.onmessage = (ev) => {
        try {
          const data = JSON.parse(ev.data);
          if (mounted && data?.mint) {
            setFeed((s) => {
              // Check if token already exists to avoid duplicates
              const exists = s.some(token => token.mint === data.mint);
              if (exists) return s;
              
              return [data, ...s].slice(0, 100); 
            });
          }
        } catch (err) {
          console.error("Invalid WebSocket message:", err);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket closed, reconnecting...");
        // Simple backoff strategy
        const timeout = Math.min(30000, 1000 * attemptsRef.current);
        setTimeout(connect, timeout);
      };

      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
        ws.close();
      };
    }

    connect();

    return () => {
      mounted = false;
      websocketRef.current?.close();
    };
  }, [url]);

  return { feed, clear: () => setFeed([]) };
}
