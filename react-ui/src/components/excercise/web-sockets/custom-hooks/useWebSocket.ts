import { useEffect, useRef, useState, useCallback } from "react";
import { useNetworkStatus } from "../../../learning/custom-hooks/use-network-status";

interface WebSocketMessage {
  type: string;
  [key: string]: any;
}

const useWebSocket = (
  url: string,
  onMessage: (data: WebSocketMessage) => void,
  reconnectInterval: number = 5000 // Interval to attempt reconnection (in ms)
) => {
  const [connected, setConnected] = useState(false);
  const [reconnecting, setReconnecting] = useState(false); // Track if we're reconnecting
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

  // Get the current network status
  const isOnline = useNetworkStatus();

  const connectWebSocket = useCallback(() => {
    console.log("Establishing WebSocket connection...");
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log(`Connected to WebSocket server at ${url}`);
      setConnected(true);
      setReconnecting(false); // Stop reconnecting if connection is established
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message received:", data);
      onMessage(data);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
      setConnected(false);
      if (!reconnecting) {
        setReconnecting(true);
        reconnect(); // Attempt reconnection
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error observed:", error);
      // Optionally handle error events differently
    };
  }, [url, onMessage, reconnecting]);

  const reconnect = useCallback(() => {
    console.log(
      `Attempting to reconnect in ${reconnectInterval / 1000} seconds...`
    );
    reconnectTimeout.current = setTimeout(() => {
      connectWebSocket(); // Try to reconnect after the specified interval
    }, reconnectInterval);
  }, [connectWebSocket, reconnectInterval]);

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

  // Effect to connect WebSocket only when online
  useEffect(() => {
    if (isOnline) {
      if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
        connectWebSocket(); // Connect when online
      }
    } else {
      if (ws.current) {
        ws.current.close(); // Close WebSocket when offline
        setConnected(false);
      }
    }

    // Cleanup on unmount
    return () => {
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current); // Clear reconnection timeout if component unmounts
      }
      ws.current?.close();
      ws.current = null;
    };
  }, [isOnline, connectWebSocket]);

  return { connected, sendMessage, reconnecting };
};

export default useWebSocket;
