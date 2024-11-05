import React from "react";
import { observer, Observer } from "mobx-react";
import { mobXCounterStore } from "./mobx-store"; // Assuming you have a MobX store in mobx-store.ts
import CodeBlock from "../../common/CodeBlock";

// Separate component for rendering the count and buttons
const CounterControls: React.FC = observer(() => {
  return (
    <div>
      <p>Count: {mobXCounterStore.count}</p>
      <button onClick={() => mobXCounterStore.increment()}>Increment</button>
      <button onClick={() => mobXCounterStore.decrement()}>Decrement</button>
    </div>
  );
});

// Component using observer HOC
const ComponentUsingObserver: React.FC = observer(() => {
  return <CounterControls />;
});

// Component using Observer component (replacing useObserver hook)
const ComponentUsingObserverHook: React.FC = () => {
  return <Observer>{() => <CounterControls />}</Observer>;
};

// Main MobX Demo Component
const MobXDemoComponent: React.FC = () => {
  return (
    <div className="demo-container">
      <div className="component-container">
        <h3>Using the observer HOC</h3>
        <p>
          This component uses the <code>observer</code> higher-order component
          (HOC) to make the component reactive to changes in MobX state. It will
          automatically re-render whenever the observable{" "}
          <code>mobXCounterStore.count</code> changes.
        </p>
        <p>
          When you click the <strong>Increment</strong> or{" "}
          <strong>Decrement</strong> button, the component will re-render and
          show the updated count.
        </p>
        <CodeBlock
          code={`const ComponentUsingObserver: React.FC = observer(() => {
  return <CounterControls />;
});`}
          language="typescript"
        />
        <ComponentUsingObserver />
      </div>

      <div className="component-container">
        <h3>Using the Observer Component (Replacing useObserver)</h3>
        <p>
          This component uses the <code>Observer HOC</code> component instead of
          the deprecated <code>useObserver</code> hook to make the component
          reactive to MobX state. The <code>&lt;Observer&gt;</code> component
          works similarly to <code>observer</code>, but it provides a more
          explicit and flexible way to manage reactivity, especially for complex
          components.
        </p>
        <p>
          Just like the <code>observer</code> HOC, it will automatically
          re-render when the observable <code>mobXCounterStore.count</code>{" "}
          changes.
        </p>
        <p>
          <strong>Note:</strong> The <code>useObserver</code> hook is now
          deprecated. It is recommended to use the <code>observer HOC</code>{" "}
          component instead, or wrap the entire component in{" "}
          <code>observer</code>.
        </p>
        <CodeBlock
          code={`const ComponentUsingObserverHook: React.FC = () => {
  return (
    <Observer>
      {() => <CounterControls />}
    </Observer>
  );
};`}
          language="typescript"
        />
        <ComponentUsingObserverHook />
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
