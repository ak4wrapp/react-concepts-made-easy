import { observer } from "mobx-react";
import { mobXCounterStore } from "./mobx-store";

const MobXDemoComponent = observer(() => {
  return (
    <>
      <h2>Mob X Component</h2>
      <div>
        <p>Count: {mobXCounterStore.count}</p>
        <button onClick={() => mobXCounterStore.increament()}>
          increament
        </button>
        <button onClick={() => mobXCounterStore.decreament()}>
          decreament
        </button>
      </div>
    </>
  );
});

export default MobXDemoComponent;
