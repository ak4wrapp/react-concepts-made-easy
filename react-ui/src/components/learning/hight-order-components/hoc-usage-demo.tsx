import React from "react";
import withLoader from "./with-loader";

const HelloComponent: React.FC<{ name: string }> = ({ name }) => {
  return <h1>Hello, {name}</h1>;
};

const WrappedHelloComponent = withLoader(HelloComponent);

const HOCUsageDemo: React.FC = () => {
  const name = "Ryan";

  return (
    <>
      <WrappedHelloComponent name="Ryan" />
    </>
  );
};

export default HOCUsageDemo;