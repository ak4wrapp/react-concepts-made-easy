export const slowMultiplication = (a: number): number => {
  if (a < 1) {
    return 0;
  }
  console.log("slowMultiplication called with", a);

  // Simulate a slow operation
  for (let i = 0; i < 1234567890; i++) {
    // Do nothing (busy work to simulate a slow function)
  }
  console.log("slowMultiplication returning with", a * a);
  return a * a;
};
