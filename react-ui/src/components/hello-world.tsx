import React from "react";

const HelloComponent: React.FC<{ name: string }> = ({ name }) => {
  return <h1>Hello, {name}</h1>;
};

export default HelloComponent;
