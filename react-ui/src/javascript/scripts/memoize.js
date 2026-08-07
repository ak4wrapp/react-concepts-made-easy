// Write a memoize function that takes a function as an argument
// and returns a new function that caches the results of the original function.
// The cached results should be stored in an object,
// where the keys are the arguments passed to the original function
// and the values are the results of the function calls.
//
// If the new function is called with the same arguments again,
// it should return the cached result instead of calling the original function again.

function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache[key]) {
      console.log(
        "Returning cached result for arguments:",
        args,
        "Result:",
        cache[key]
      );
      return cache[key];
    }

    const result = fn(...args);
    cache[key] = result;

    console.log("Returning result for arguments:", args, "Result:", result);
    return result;
  };
}

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

const memoizedAdd = memoize(add);
const memoizedMultiply = memoize(multiply);

memoizedAdd(1, 2); // 3
memoizedAdd(1, 2); // 3 (cached result)
memoizedAdd(2, 3); // 5
memoizedAdd(2, 3); // 5 (cached result)

memoizedMultiply(2, 3); // 6
memoizedMultiply(2, 3); // 6 (cached result)
memoizedMultiply(3, 4); // 12
memoizedMultiply(3, 4); // 12 (cached result)
