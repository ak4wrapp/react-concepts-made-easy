import { useState } from "react";

const ChildComponent = ({ onClick }) => {
  console.log("Plain: ChildComponent is rendered");
  return <button onClick={onClick}>Click me!</button>;
};

const ParentWithoutUseCallback = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      <ChildComponent onClick={incrementCount} />
      <pre>Count: {count}</pre>
    </>
  );
};

export default ParentWithoutUseCallback;
