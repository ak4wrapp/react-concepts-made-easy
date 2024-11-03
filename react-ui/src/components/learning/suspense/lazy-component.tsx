import React, { useEffect, useState } from "react";

// The actual lazy-loaded component
const LazyComponent: React.FC = () => {
  return <h2>This is a lazily loaded component!</h2>;
};

export default LazyComponent;

// We can also stimulate this here so consumers don't have to add a delay
/*

// Simulate a loading delay with a separate function
const loadComponent = () => {
  return new Promise<{ default: React.FC }>((resolve) => {
    setTimeout(() => {
      resolve({ default: LazyComponent });
    }, 3000); // Simulate a 3-second delay
  });
};

// Export the loading function instead of the component directly
export default loadComponent;

*/
