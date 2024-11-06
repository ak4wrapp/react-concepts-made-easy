import React from "react";
import { observer, useObserver } from "mobx-react";
import { mobXCounterStore } from "./mobx-store"; // Assuming you have a MobX store in mobx-store.ts
import CodeBlock from "../../common/CodeBlock";
import "./mobx-demo.css";

// Separate component for rendering the count and buttons
const CounterControls: React.FC = observer(() => {
  return (
    <div>
      <p>Count: {mobXCounterStore.count}</p>
      <button onClick={() => mobXCounterStore.increment()}>Increment</button>
      <button onClick={() => mobXCounterStore.decrement()}>Decrement</button>
      <button onClick={() => mobXCounterStore.reset()}>Reset</button>
    </div>
  );
});

// Component using observer HOC
const ComponentUsingObserver: React.FC = observer(() => {
  return <CounterControls />;
});

const ComponentUsingUseObserver: React.FC = () => {
  return useObserver(() => <CounterControls />);
};

// Main MobX Demo Component
const MobXDemoComponent: React.FC = () => {
  return (
    <div className="demo-container">
      {/* Introduction about MobX */}
      <div className="component-container">
        <h3>What is MobX?</h3>
        <p>
          MobX is a state management library that enables automatic reactivity.
          It tracks dependencies and updates components when observable state
          changes. MobX is especially useful for managing complex, mutable state
          in React applications.
        </p>
      </div>

      {/* Observer HOC and useObserver Hook side-by-side */}
      <div className="side-by-side-container">
        {/* Left: Using the observer HOC Section */}
        <div className="left-section">
          <h3>Using the observer HOC</h3>
          <p>
            Use the <code>observer</code> HOC to automatically re-render
            components when observable state changes.
          </p>
          <CodeBlock
            code={`const ComponentUsingObserver: React.FC = observer(() => {
  return <CounterControls />;
});`}
            language="typescript"
          />
          <ComponentUsingObserver />
        </div>

        {/* Right: Using the useObserver Hook (deprecated) */}
        <div className="right-section">
          <h3>
            Using the <code>useObserver</code> Hook (deprecated)
          </h3>
          <p>
            The <code>useObserver</code> hook is deprecated. It's recommended to
            use the <code>&lt;Observer&gt;</code> component for fine-grained
            reactivity, or <code>observer</code> HOC for component-level
            reactivity.
          </p>
          <p>
            The example below uses <code>useObserver</code> for demonstrating
            the old API, but it's encouraged to move to the newer approach.
          </p>
          <CodeBlock
            code={`import { useObserver } from 'mobx-react-lite';

const ComponentUsingUseObserver: React.FC = () => {
  return useObserver(() => <CounterControls />);
};`}
            language="typescript"
          />
          <ComponentUsingUseObserver />
        </div>
      </div>

      {/* MobX Store Code */}
      <div className="component-container">
        <h3>MobX Store Code</h3>
        <p>
          Here's the code for the MobX store that manages the count state. The
          store uses MobX's reactive features, including observable state and
          actions to modify the state.
        </p>
        <CodeBlock
          code={`import { makeObservable, observable, action } from "mobx";
// Define your store class
class MobXCounterStore {
  count = 0;

  constructor() {
    // Make the class properties observable, and mark methods as actions
    makeObservable(this, {
      count: observable, // Mark 'count' as an observable
      increment: action, // Mark 'increment' as an action
      decrement: action, // Mark 'decrement' as an action
      reset: action, // Mark 'reset' as an action
    });
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  reset() {
    this.count = 0;
  }
}

export const mobXCounterStore = new MobXCounterStore();`}
          language="typescript"
        />
      </div>

      {/* CounterControls Component */}
      <div className="component-container">
        <h3>CounterControls Component</h3>
        <p>
          Here's the code for the <strong>CounterControls</strong> component. It
          displays the current count and buttons for incrementing and
          decrementing the count in the MobX store.
        </p>
        <CodeBlock
          code={`const CounterControls: React.FC = observer(() => {
  return (
    <div>
      <p>Count: {mobXCounterStore.count}</p>
      <button onClick={() => mobXCounterStore.increment()}>Increment</button>
      <button onClick={() => mobXCounterStore.decrement()}>Decrement</button>
      <button onClick={() => mobXCounterStore.reset()}>Reset</button>
    </div>
  );
});`}
          language="typescript"
        />
        <p>
          <strong>Note:</strong> Ensure that the <code>CounterControls</code>{" "}
          component is wrapped with the <code>observer</code> HOC (as shown in
          the code above). This is crucial because the component directly
          depends on MobX observable state (<code>mobXCounterStore.count</code>
          ), and wrapping it with <code>observer</code> ensures that any changes
          to this observable state will trigger re-renders. Without it, the
          component will not update when the state changes.
        </p>
      </div>
    </div>
  );
};

export default MobXDemoComponent;
