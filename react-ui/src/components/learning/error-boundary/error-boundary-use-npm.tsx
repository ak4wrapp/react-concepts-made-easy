import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import React, { useState } from "react";

const BuggyComponent = ({ setError }) => {
  const handleClick = () => {
    setError(new Error("This is a test error from BuggyComponent!"));
  };

  return (
    <>
      <h3>BuggyComponent</h3>
      <button onClick={handleClick}>Trigger Error</button>
    </>
  );
};

const ErrorHandlingComponent = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  return (
    <>
      <h5>Error: {error.toString()}</h5>
      <button onClick={resetErrorBoundary}>Retry!</button>
    </>
  );
};

const ErrorBoundaryUsingNpmDemo = () => {
  const [error, setError] = useState<Error | null>(null);

  const handleReset = () => {
    setError(null);
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlingComponent}
      onError={(error) => {
        console.log(error.toString());
      }}
      onReset={handleReset}
      resetKeys={[error]} // Resets the boundary when error changes
    >
      {error ? (
        <ErrorHandlingComponent
          error={error}
          resetErrorBoundary={handleReset}
        />
      ) : (
        <BuggyComponent setError={setError} />
      )}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryUsingNpmDemo;
