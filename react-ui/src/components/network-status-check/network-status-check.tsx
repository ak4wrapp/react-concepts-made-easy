import { useNetworkStatus } from "../../custom-hooks/use-network-status";

function NetworkStatusCheck() {
  const isConnected = useNetworkStatus();

  return (
    <h1>
      <span className="material-icons" style={{ color: isConnected ? 'green' : 'red' }}>
        {isConnected ? 'cloud' : 'cloud_off'}
      </span>
      {isConnected ? " Online" : " Disconnected"}
    </h1>
  );
}

export default NetworkStatusCheck;
