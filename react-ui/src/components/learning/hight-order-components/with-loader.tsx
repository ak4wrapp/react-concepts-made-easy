import React, { useEffect, useState } from "react";

const withLoader = (WrappedComponent) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Show loader for 3 seconds and then show Wrapped Component
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      // Clean up
      return () => {
        clearTimeout(timer);
      };
    }, []);

    const loaderStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "70vh",
      margin: 0,
    };

    return isLoading ? (
      <div style={loaderStyle}>
        <img
          src="https://i.pinimg.com/originals/37/52/0f/37520f15974a0100d7debbbd64f2bdef.gif"
          alt="Loading..."
          style={{ width: "150px", height: "auto" }} // Adjust the width as needed
        />
      </div>
    ) : (
      <WrappedComponent {...props} />
    );
  };
};

export default withLoader;
