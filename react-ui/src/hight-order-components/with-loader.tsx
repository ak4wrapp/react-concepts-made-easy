import React, { useEffect, useState } from "react";

const withLoader = (WrappedComponent) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Show loader for 5 seconds and then show Wrapped Component
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 5000);

      // Clean up
      return () => {
        clearTimeout(timer);
      };
    }, [isLoading]);

    return isLoading ? <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Gray_circles_rotate.gif" /> : <WrappedComponent {...props} />;
  };
};

export default withLoader;
