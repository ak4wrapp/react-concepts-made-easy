// Let's explore Array methods (map, filter, sort, flatMap, reduce) with examples
// Using map to transform an array of numbers by squaring each number
const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map((num) => num * num);
console.log(squaredNumbers); // Output: [1, 4, 9, 16, 25]

// Using filter to get only even numbers from an array
const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log(evenNumbers); // Output: [2, 4]

// Using sort to sort an array of strings alphabetically
const fruits = ["banana", "apple", "cherry", "date"];
const sortedFruits = fruits.sort();
console.log(sortedFruits); // Output: ['apple', 'banana', 'cherry', 'date']

// Using flatMap to flatten an array of arrays and map each element
const nestedArrays = [[1, 2], [3, 4], [5]];
const flattenedAndMapped = nestedArrays.flatMap((arr) =>
  arr.map((num) => num * 2)
);
console.log(flattenedAndMapped); // Output: [2, 4, 6, 8, 10]

// Using reduce to calculate the sum of an array of numbers
const sum = numbers.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);
console.log(sum); // Output: 15
