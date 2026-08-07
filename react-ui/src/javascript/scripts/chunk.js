// Chunk.js
// A function to split an array into chunks of a specified size
function chunk(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const chunkedData = chunk(data, 3);
console.log(chunkedData);
// Output: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
