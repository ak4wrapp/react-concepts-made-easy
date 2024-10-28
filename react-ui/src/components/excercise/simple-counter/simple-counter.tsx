import React, { useState } from "react";
import "./simple-counter.css";

const SimpleCounter = () => {
  const [counter, setCounter] = useState(0);

  const decreamentCounter = () => {
    if (counter > 0) {
      setCounter((prevVal) => prevVal - 1);
    }
  };
  const incrementCounter = () => {
    setCounter((prevVal) => prevVal + 1);
  };

  const resetCounter = () => {
    setCounter(0);
  };

  return (
    <div className="container">
      <button onClick={decreamentCounter} disabled={counter === 0}>
        -
      </button>
      <h4>{counter}</h4>
      <button onClick={incrementCounter}>+</button>
      <span></span>
      <button onClick={resetCounter}>Reset Counter</button>
    </div>
  );
};

export default SimpleCounter;
