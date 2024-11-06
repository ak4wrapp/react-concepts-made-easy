import React, { useEffect, useState } from "react";
import ErrorBoundary2 from "./error-boundary2";

const BuggyComponent: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Simulate an error after component mounts
    setTimeout(() => {
      setHasError(true);
    }, 1000);
  }, []);

  if (hasError) {
    throw new Error("This is a test error from BuggyComponent!");
  }

  const handleReset = () => {
    setHasError(false); // Reset the error state
  };

  return (
    <div>
      <b>Some Child Component Here</b>
      <br />
      {hasError && <button onClick={handleReset}>Try Again</button>}
    </div>
  );
};

const ErrorBoundary2Demo = () => {
  return (
    <ErrorBoundary2>
      <BuggyComponent />
    </ErrorBoundary2>
  );
};

export default ErrorBoundary2Demo;
