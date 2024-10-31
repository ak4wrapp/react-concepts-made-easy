import React from "react";
import HelloComponent from "./hello-world";

const Home: React.FC = (props) => {
  const name = "User!";
  return <HelloComponent name={name} />;
};

export default Home;
