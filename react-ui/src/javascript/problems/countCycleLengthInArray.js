function countCycleLength(arr, startIndex) {
  let current = startIndex;
  const set = new Set();

  while (!set.has(current)) {
    set.add(current);
    current = arr[current];
  }

  return set.size;
}
