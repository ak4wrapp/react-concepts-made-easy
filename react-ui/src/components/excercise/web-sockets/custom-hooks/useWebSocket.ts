import { useEffect, useRef, useState, useCallback } from "react";
import { useNetworkStatus } from "../../../learning/custom-hooks/use-network-status";

interface WebSocketMessage {
  type: string;
  [key: string]: any;
}

const useWebSocket = (
  url: string,
  onMessage: (data: WebSocketMessage) => void,
  reconnectInterval = 5000
) => {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const isReconnectingRef = useRef(false);
  const onMessageRef = useRef(onMessage);

  const [connected, setConnected] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null); // <-- New state

  const isOnline = useNetworkStatus();

  // Keep latest handler without reconnecting
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  const clearReconnectTimer = () => {
    if (reconnectTimeoutRef.current !== null) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  };
  const scheduleReconnect = () => {
    clearReconnectTimer();
    reconnectTimeoutRef.current = window.setTimeout(() => {
      connect();
    }, reconnectInterval);
  };

  const connect = useCallback(() => {
    if (wsRef.current) return;

    console.log("Connecting WebSocket:", url);
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      console.log("WebSocket connected");
      setConnected(true);
      setReconnecting(false);
      setNetworkError(null); // <-- Reset network error on successful connection
      isReconnectingRef.current = false;
      clearReconnectTimer();
    };

    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessageRef.current(data);
      } catch (e) {
        console.error("Invalid WebSocket message:", e);
      }
    };

    wsRef.current.onclose = () => {
      console.warn("WebSocket closed");
      wsRef.current = null;
      setConnected(false);

      if (!isReconnectingRef.current && isOnline) {
        isReconnectingRef.current = true;
        setReconnecting(true);
        scheduleReconnect();
      }
    };

    wsRef.current.onerror = (err) => {
      console.error("WebSocket error:", err);
      setNetworkError("WebSocket connection error"); // <-- Set network error
      wsRef.current?.close();
    };
  }, [url, isOnline, reconnectInterval, scheduleReconnect]);

  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket not connected, cannot send");
    }
  }, []);

  useEffect(() => {
    if (isOnline) {
      connect();
    } else {
      wsRef.current?.close();
      wsRef.current = null;
      setConnected(false);
      setNetworkError("No network connection"); // <-- Network offline
    }

    return () => {
      clearReconnectTimer();
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [isOnline, connect]);

  return { connected, reconnecting, networkError, sendMessage }; // <-- Export networkError
};

export default useWebSocket;
