// This is a simple throttle function that limits the rate at which a function can be called.
// It ensures that the function is not called more than once every `limit` milliseconds.
function throttle(func, limit) {
  let lastFunc;
  let lastRan;

  return function (...args) {
    const context = this;

    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

function searchFunction(query) {
  console.log(`Searching for: ${query}`);
}

const throttledSearch = throttle(searchFunction, 300);

// A quick helper to pause the simulation loop
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function simulateRealTyping() {
  const simulatedKeystrokes = [
    "j",
    "ja",
    "jav",
    "java", // Fast typing (Word 1)
    "java ", // User pauses to think...
    "java s",
    "java sc",
    "java scr",
    "java scri",
    "java scrip",
    "java script", // Fast typing (Word 2)
  ];

  console.log("--- Starting Typing Simulation ---");

  for (let i = 0; i < simulatedKeystrokes.length; i++) {
    const currentQuery = simulatedKeystrokes[i];

    // Print every keystroke immediately
    console.log(`Typing: ${currentQuery}`);

    // Throttled search
    throttledSearch(currentQuery);

    if (i === 4) {
      console.log("[User Paused...]");
      await sleep(250);
    } else {
      const randomTypingSpeed = Math.floor(Math.random() * 50) + 20; // 20-39ms
      await sleep(randomTypingSpeed);
    }
  }

  console.log("--- Typing Simulation Complete ---");
}

simulateRealTyping();
