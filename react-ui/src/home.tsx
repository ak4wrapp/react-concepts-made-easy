import React from "react";
import withLoader from "./hight-order-components/with-loader";
import HelloComponent from "./components/hello-world";

const WrappedHelloComponent = withLoader(HelloComponent);
const Home: React.FC = (props) => {
  const name = "Ryan"; // You can dynamically set this or fetch it from props/state

  return (
    <>
      <WrappedHelloComponent name={name} />
    </>
  );
};

export default Home;
