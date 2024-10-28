import React, { memo } from "react";
import { useCallback, useState } from "react";
import "./use-callback.css";

// Define the props interface for ChildComponent
interface ChildComponentProps {
  onClick: () => void; // Specify that onClick is a function
}

const ChildComponent = (props: ChildComponentProps) => {
  console.log("Plain: ChildComponent is rendered");
  return (
    <div className="child">
      <span>This is Child Component</span>
      <button onClick={props.onClick} className="child-button">
        Click me!
      </button>
    </div>
  );
};

const ParentWithoutUseCallback = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      <div className="parent">
        <span>This is Parent Component</span>

        <div className="child-container">
          <ChildComponent onClick={incrementCount} />
        </div>

        <pre>Count: {count}</pre>
      </div>
    </>
  );
};

const ChildComponentWithMemo = memo((props: ChildComponentProps) => {
  console.log("Memoized: ChildComponent is rendered");
  return (
    <div className="child">
      <span>This is Child Component</span>
      <button onClick={props.onClick} className="child-button">
        Click me!
      </button>
    </div>
  );
});

const ParentWithUseCallback = () => {
  const [count, setCount] = useState(0);

  const incrementCount = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <>
      <div className="parent">
        <span>This is Parent Component</span>

        <div className="child-container">
          <ChildComponentWithMemo onClick={incrementCount} />
        </div>

        <pre>Count: {count}</pre>
      </div>
    </>
  );
};

export { ParentWithoutUseCallback, ParentWithUseCallback };
