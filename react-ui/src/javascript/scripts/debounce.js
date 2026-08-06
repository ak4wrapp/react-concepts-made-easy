// This is a simple debounce function that delays the execution of a function until after
// a specified wait time has elapsed since the last time it was invoked.
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func(...args);
    }, wait);

    console.log(`⏳ New ${wait}ms timer started`);
  };
}

function searchFunction(query) {
  console.log(`Searching for: ${query}`);
}

const debouncedSearch = debounce(searchFunction, 300);

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

    // Debounced search
    debouncedSearch(currentQuery);

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
