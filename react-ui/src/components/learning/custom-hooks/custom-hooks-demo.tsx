import { useNetworkStatus } from "./use-network-status";

function CustomHooksDemo() {
  const isConnected = useNetworkStatus();

  const boxStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    margin: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  };

  return (
    <div style={boxStyle}>
      <h2>Network Connectivity Status</h2>
      <p>We are using a custom hook to monitor network connectivity.</p>
      <p>
        To see it in action, open Developer Tools, go to the Network tab, and
        turn off the network to simulate a disconnection.
      </p>
      <h1>
        <span
          className="material-icons"
          style={{
            color: isConnected ? "green" : "red",
            fontSize: "48px",
            marginRight: "10px",
          }}
        >
          {isConnected ? "cloud" : "cloud_off"}
        </span>
        {isConnected ? " Online" : " Disconnected"}
      </h1>
    </div>
  );
}

export default CustomHooksDemo;
