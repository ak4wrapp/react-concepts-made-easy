import React, { useEffect } from "react";
import ErrorBoundary2 from "./error-boundary2";

const BuggyComponent: React.FC<{ raiseError: boolean }> = ({ raiseError }) => {
  if (raiseError) {
    throw new Error("This is a test error from SomeChildComponent!");
  }
  return <b>Some Child Component Here</b>;
};

const ErrorBoundary2Demo = () => {
  return (
    <ErrorBoundary2>
      <BuggyComponent raiseError={false} />
      <BuggyComponent raiseError={true} />
    </ErrorBoundary2>
  );
};

export default ErrorBoundary2Demo;
