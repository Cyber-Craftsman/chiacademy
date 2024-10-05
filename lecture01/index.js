/*
Task: Write a program that outputs numbers from 1 to 10
using a for loop and a while loop.
*/

// Output numbers from 1 to 10 using a for loop
console.log('For loop:');
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// Output numbers from 1 to 10 using a while loop
console.log('While loop:');
let j = 1;
while (j <= 10) {
  console.log(j);
  j++;
}

/*
Task: Create an array of different primitive types (number, string, boolean) of length 10. 
Output their types using typeof with forEach, for, while, and do while loops.
*/

// Create an array with different primitive types
const mixedArray = [42, 'Availability', true, null, undefined, 3.14, 'Maintainability', false, 121, 'Scalability'];

// Using forEach
console.log('Using forEach:');
mixedArray.forEach((element) => console.log(typeof element));

// Using for loop
console.log('Using for loop:');
for (let i = 0; i < mixedArray.length; i++) {
  console.log(typeof mixedArray[i]);
}

// Using while loop
console.log('Using while loop:');
j = 0;
while (j < mixedArray.length) {
  console.log(typeof mixedArray[j]);
  j++;
}

// Using do while loop
console.log('Using do while loop:');
j = 0;
do {
  console.log(typeof mixedArray[j]);
  j++;
} while (j < mixedArray.length);

/*
Task: Create an array of objects and use the filter method
to output all objects where age is greater than 20.
*/

// Create an aaray of objects
const people = [
  { name: 'Alice', age: 25, pets: ['cat', 'dog'] },
  { name: 'Bob', age: 19, pets: ['hamster'] },
  { name: 'Charlie', age: 30, pets: ['parrot'] },
  { name: 'David', age: 22, pets: ['rabbit', 'dog'] },
  { name: 'Eva', age: 18, pets: ['cat'] },
  { name: 'Frank', age: 28, pets: ['dog', 'fish'] },
];

// Use filter to find all people older than 20
const olderThan20 = people.filter((person) => person.age > 20);

// Output the filtered results
console.log('People older that 20:');
console.log(olderThan20);
