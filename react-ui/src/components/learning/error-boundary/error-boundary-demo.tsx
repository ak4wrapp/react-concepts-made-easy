import ErrorBoundary from "./error-boundary";

const BuggyComponent: React.FC<{ raiseError: boolean }> = ({ raiseError }) => {
  if (raiseError) {
    throw new Error("This is a test error from SomeChildComponent!");
  }
  return <b>Some Child Component Here</b>;
};

const ErrorBoundaryDemo = () => {
  return (
    <ErrorBoundary>
      <BuggyComponent raiseError={false} />
      <BuggyComponent raiseError={true} />
    </ErrorBoundary>
  );
};

export default ErrorBoundaryDemo;
