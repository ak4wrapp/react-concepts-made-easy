import React, { useState, useEffect, useMemo } from "react";
import { slowMultiplication } from "../../../utils/slowMultiplication";
import CodeBlock from "../../common/CodeBlock";
import "./useMemoDemo.css"; // Import the CSS file for styles

const useMemoDemo: React.FC = () => {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);
  const [debouncedNumber, setDebouncedNumber] = useState(0); // State for debounced number

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedNumber(number); // Update debounced number after a delay
    }, 500); // 500ms debounce delay

    // Cleanup the timeout if the component is unmounted or `number` changes
    return () => {
      clearTimeout(handler);
    };
  }, [number]); // Only reset when `number` changes

  const multipliedNumber = useMemo(() => {
    return slowMultiplication(debouncedNumber);
  }, [debouncedNumber]);

  const themeClass = dark
    ? "useMemoDemo__result__dark"
    : "useMemoDemo__result__light";

  return (
    <div>
      <div className="useMemoDemo__container">
        <h2 className="useMemoDemo__header">
          Understanding <code>useMemo</code>
        </h2>
        <p>
          In this example, we are using <code>useMemo</code> to prevent
          unnecessary recalculations of the multiplication result. Normally,
          React will re-render the component every time state changes, but with{" "}
          <code>useMemo</code>, the multiplication is only recalculated when the
          number changes. This means that toggling the theme does not trigger
          the slow multiplication logic, making the app more efficient.
        </p>

        <div className="useMemoDemo__codeBlockContainer">
          <h3>Result without useMemo</h3>
          <CodeBlock
            code={`const multipliedNumber = slowMultiplication(debouncedNumber);`}
            language="typescript"
          />
        </div>

        <div className="useMemoDemo__codeBlockContainer">
          <h3>Memoized result with useMemo</h3>
          <CodeBlock
            code={`const multipliedNumber = useMemo(() => {
  return slowMultiplication(debouncedNumber);
}, [debouncedNumber]);`}
            language="typescript"
          />
        </div>

        <p>
          Try entering a number below and toggling the theme. Notice how the
          result does not recalculate when you toggle the theme, but only when
          you change the number. Additionally, observe how the number input is
          debounced, so the slow multiplication function will only be triggered
          after a brief delay once you stop typing.
        </p>
      </div>

      <div>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
          className="useMemoDemo__input"
          placeholder="Enter a number"
        />
      </div>

      <div className={`useMemoDemo__result ${themeClass}`}>
        <div>Result is {multipliedNumber}</div>

        <button
          className="useMemoDemo__toggleButton"
          onClick={() => setDark(!dark)}
        >
          Toggle Result Box Theme
        </button>
      </div>
    </div>
  );
};

export default useMemoDemo;
