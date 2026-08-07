// Write a group by function that takes an array of objects and a key as arguments
// and returns an object where the keys are the values of the specified key in the objects
// and the values are arrays of objects that have that key value.

function groupBy(array, key) {
  return array.reduce((result, currentValue) => {
    const groupKey = currentValue[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(currentValue);
    return result;
  }, {});
}

const data = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 25 },
  { name: "David", age: 30 },
];

console.log(groupBy(data, "age"));
// Output:
// {
//   '25': [ { name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 } ],
//   '30': [ { name: 'Bob', age: 30 }, { name: 'David', age: 30 } ]
// }
