import React, { useEffect } from "react";
import ErrorBoundary from "./error-boundary";

const SomeChildComponent: React.FC<{ raiseError: boolean }> = ({
  raiseError,
}) => {
  useEffect(() => {
    console.log("SomeChildComponent mounted");

    return () => console.log("SomeChildComponent unmounted");
  }, []);

  if (raiseError) {
    throw new Error("This is a test error from SomeChildComponent!");
  }
  return (
    <>
      <b>Some Child Component Here</b>
    </>
  );
};

const ErrorBoundaryDemo = () => {
  useEffect(() => {
    console.log("ErrorBoundaryDemo mounted");
  }, []);

  return (
    <ErrorBoundary>
      <SomeChildComponent raiseError={false} />
      <SomeChildComponent raiseError={true} />
    </ErrorBoundary>
  );
};

export default ErrorBoundaryDemo;
