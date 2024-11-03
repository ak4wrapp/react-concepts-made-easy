import React, { useEffect, useState } from "react";

const ErrorBoundary2 = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (event) => {
      setHasError(true);
    };

    const unhandledRejectionHandler = (event) => {
      setHasError(true);
    };

    window.addEventListener("error", errorHandler);
    window.addEventListener("unhandledrejection", unhandledRejectionHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
      window.removeEventListener(
        "unhandledrejection",
        unhandledRejectionHandler
      );
    };
  }, []);

  if (hasError) {
    return <h2>Something went wrong.</h2>;
  }

  return children;
};

export default ErrorBoundary2;
