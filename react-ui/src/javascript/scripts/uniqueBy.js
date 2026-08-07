// uniqueBy.js
// A function to filter an array of objects by a unique key
function uniqueBy(array, key) {
  const seen = new Set();
  return array.filter((item) => {
    const keyValue = item[key];
    if (seen.has(keyValue)) {
      return false;
    } else {
      seen.add(keyValue);
      return true;
    }
  });
}

const data = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 1, name: "Charlie" },
  { id: 3, name: "David" },
  { id: 4, name: "David" },
];

console.log(uniqueBy(data, "id"));
// Output: [ { id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'David' } ]
console.log(uniqueBy(data, "name"));
// Output: [ { id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'David' } ]
