import React from "react";
import withLoader from "../hight-order-components/with-loader";
import HelloComponent from "./hello-world";

const WrappedHelloComponent = withLoader(HelloComponent);

const Home: React.FC = (props) => {
  const name = "Ryan";
  return <WrappedHelloComponent name={name} />;
};

export default Home;
