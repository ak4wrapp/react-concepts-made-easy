// useWebSocket.ts
import { useEffect, useRef, useState, useCallback } from "react";

interface WebSocketMessage {
  type: string;
  [key: string]: any;
}

const useWebSocket = (
  url: string,
  onMessage: (data: WebSocketMessage) => void
) => {
  const [connected, setConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    console.log("Establishing WebSocket connection...");
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log(`Connected to WebSocket server at ${url}`);
      setConnected(true);
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message received:", data);
      onMessage(data);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
      setConnected(false);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error observed:", error);
    };

    return () => {
      console.log("Cleaning up WebSocket connection...");
      ws.current?.close();
      ws.current = null; // Clear the reference
    };
  }, [url, onMessage]);

  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
      console.log("Message sent:", message);
    } else {
      console.error(
        "WebSocket is not open. Current state:",
        ws.current?.readyState
      );
    }
  }, []);

  return { connected, sendMessage };
};

export default useWebSocket;
