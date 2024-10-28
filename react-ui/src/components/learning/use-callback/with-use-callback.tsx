import React, { memo } from "react";
import { useCallback, useState } from "react";

// Define the props interface for ChildComponent
interface ChildComponentProps {
  onClick: () => void; // Specify that onClick is a function
}

const ChildComponent = memo((props: ChildComponentProps) => {
  console.log("Memoized: ChildComponent is rendered");
  return <button onClick={props.onClick}>Click me!</button>;
});

const ParentWithUseCallback = () => {
  const [count, setCount] = useState(0);

  const incrementCount = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <>
      <ChildComponent onClick={incrementCount} />
      <pre>Count: {count}</pre>
    </>
  );
};

export default ParentWithUseCallback;
