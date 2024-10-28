import { useEffect, useState } from "react";

export function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    function handleConnected() {
      setIsConnected(true);
    }

    function handleDisconected() {
      setIsConnected(false);
    }

    // Subscribing to events
    window.addEventListener("online", handleConnected);
    window.addEventListener("offline", handleDisconected);

    // Clean up/UnSubscribing
    return () => {
      window.removeEventListener("online", handleConnected);
      window.removeEventListener("offline", handleDisconected);
    };
  }, []);

  return isConnected;
}
