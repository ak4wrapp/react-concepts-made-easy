import React from "react";

const withLoader = (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <div>Loading...</div>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withLoader;
