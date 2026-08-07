// Function to check if a number is prime
function isPrime(num) {
  if (num <= 1) return false; // 0 and 1 are not prime numbers
  if (num <= 3) return true; // 2 and 3 are prime numbers

  // Check for factors from 2 to the square root of num so we can reduce the number of iterations
  // and check if num is divisible by any number in that range. If it is, then num is not prime.
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false; // Found a factor, not prime
  }
  return true; // No factors found, number is prime
}

// Example usage:
console.log(isPrime(11)); // Output: true
console.log(isPrime(4)); // Output: false
console.log(isPrime(67)); // Output: true

console.log(Math.sqrt(4)); // Output: 2
