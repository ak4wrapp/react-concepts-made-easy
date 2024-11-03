// src/App.tsx
import React, { Suspense } from "react";

/*
// Lazy load the component which stimulates delay in it
const LazyComponent = React.lazy(() =>
  import("./lazy-component").then((load) => load.default())
);
*/

// Stimulates that while importing LazyComponent it takes some time
const LazyComponent = React.lazy(() => {
  return new Promise<{ default: React.FC }>((resolve) => {
    setTimeout(() => {
      resolve(import("./lazy-component"));
    }, 3000);
  });
});

const SuspenseDemo: React.FC = () => {
  return (
    <div>
      <Suspense fallback={<b>Waiting for LazyComponent for 3 seconds...</b>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
};

export default SuspenseDemo;
