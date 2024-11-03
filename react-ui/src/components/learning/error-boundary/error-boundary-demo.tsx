import ErrorBoundary from "./error-boundary";
import { useErrorBoundary } from "react-error-boundary";

const BuggyComponent: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <>
      <h3>BuggyComponent</h3>
      <button onClick={onClick}>Trigger Error</button>
    </>
  );
};

const BuggyComponentWithUseErrorBoundary = () => {
  const { showBoundary } = useErrorBoundary();

  // Only trigger the error on a certain condition or interaction
  const handleClick = () => {
    showBoundary(new Error("This is a test error from BuggyComponent!"));
  };

  return <BuggyComponent onClick={handleClick} />;
};

const ErrorBoundaryDemo = () => {
  return (
    <>
      <div>
        <h1>1. BuggyComponentWithUseErrorBoundary</h1>
        <ErrorBoundary>
          <BuggyComponentWithUseErrorBoundary />
        </ErrorBoundary>
      </div>

      <>
        <div>
          <h1>2. BuggyComponentWithUseErrorBoundary</h1>
          <ErrorBoundary>
            <BuggyComponentWithUseErrorBoundary />
          </ErrorBoundary>
        </div>
      </>
    </>
  );
};

export default ErrorBoundaryDemo;
