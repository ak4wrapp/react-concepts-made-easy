// quick-interview-questions.js

console.log(2 < 3 > 2); // false
// Why above is false? Because 2 < 3 evaluates to true, which is coerced to 1 in the next comparison, so it becomes 1 > 2, which is false.

console.log(2 < 3 && 3 > 2); // true
// Why above is true? Because both conditions are true.

console.log(2 < 3 || 3 > 2); // true
// Why above is true? Because at least one of the conditions is true.

console.log([] === []); // false
// Why above is false? Because [] creates a new array each time, and two different arrays are not equal.

console.log([] == []); // false
// Why above is false? Same reason as above, two different arrays are not equal.

console.log(2 + "2" - 2); // 20
// Why above is 20? Because 2 + "2" results in the string "22", and then "22" - 2 coerces "22" to a number, resulting in 20.

console.log(2 + "2" + 2); // 222
// Why above is 222? Because 2 + "2" results in the string "22", and then "22" + 2 results in the string "222".

console.log(0.1 + 0.2 === 0.3); // false
// Why above is false? Because of floating-point precision issues in JavaScript, 0.1 + 0.2 results in 0.30000000000000004, which is not equal to 0.3.

console.log(!!"false"); // true
// Why above is true? Because the string "false" is a truthy value, and !! converts it to a boolean.

console.log(!!""); // false
// Why above is false? Because an empty string is a falsy value, and !! converts it to a boolean.

console.log(null == undefined); // true
// Why above is true? Because null and undefined are considered equal in non-strict equality comparison.

console.log(null === undefined); // false
// Why above is false? Because null and undefined are different types, so they are not strictly equal.

console.log(NaN === NaN); // false
// Why above is false? Because NaN is not equal to anything, including itself.

console.log(isNaN(NaN)); // true
// Why above is true? Because isNaN checks if the value is NaN, and NaN is indeed NaN.

console.log(typeof NaN); // "number"
// Why above is "number"? Because in JavaScript, NaN is considered a number type.

console.log(0 == false); // true
// Why above is true? Because 0 is a falsy value, and false is also a falsy value, so they are considered equal in non-strict comparison.

console.log(0 === false); // false
// Why above is false? Because 0 is a number and false is a boolean, so they are not strictly equal.

console.log(1 == true); // true
// Why above is true? Because 1 is a truthy value, and true is also a truthy value, so they are considered equal in non-strict comparison.

console.log(1 === true); // false
// Why above is false? Because 1 is a number and true is a boolean, so they are not strictly equal.

console.log([] == false); // true
// Why above is true? Because [] is a truthy value, but when compared to false, it is coerced to 0, which is falsy, so they are considered equal in non-strict comparison.

console.log([] === false); // false
// Why above is false? Because [] is an object and false is a boolean, so they are not strictly equal.

console.log({} == false); // false
// Why above is false? Because {} is an object and false is a boolean, so they are not equal in non-strict comparison.

console.log({} === false); // false
// Why above is false? Because {} is an object and false is a boolean, so they are not strictly equal.

console.log([] + []); // ""
// Why above is ""? Because [] is coerced to an empty string when used with the + operator, so the result is an empty string.

console.log([] + {}); // "[object Object]"
// Why above is "[object Object]"? Because [] is coerced to an empty string and {} is coerced to "[object Object]", so the result is "[object Object]".

console.log({} + []); // 0
// Why above is 0? Because {} is treated as a block and [] is coerced to 0, so the result is 0.
