import ParentWithUseCallback from "./with-use-callback";
import ParentWithoutUseCallback from "./without-use-callback";

const UseCallbackDemo = () => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <div style={{ marginRight: "20px", textAlign: "center" }}>
          <h2>Without useCallback</h2>
          <ParentWithoutUseCallback />
        </div>
        <div
          style={{
            borderLeft: "1px solid #ccc",
            height: "50px",
            margin: "0 20px",
          }}
        />
        <div style={{ marginLeft: "20px", textAlign: "center" }}>
          <h2>With useCallback</h2>
          <ParentWithUseCallback />
        </div>
      </div>
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Note: Open the Console in Developer Tools to see how the Child component
        logs when clicked without useCallback.
      </p>
    </div>
  );
};

export default UseCallbackDemo;
