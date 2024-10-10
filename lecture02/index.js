/*
 * Higher-order functions and closures:
 *
 * Create a function that accepts an object (e.g., {access-token: 'qwerty'})
 * and adds it to every data structure passed to the resulting function.
 * Additionally, the object will have a 'count' field.
 * This field should increment by 1 with every call to the function.
 *
 * Example:
 *
 * function addParamsToRequest(params) {........}
 *
 * const sendData = addParamsToRequest(.........);
 *
 * const result = sendData(......some data.....);
 *
 * console.log(result);
 *
 * Result should look like an object:
 *
 * {
 *   access-token: 'qwerty',
 *   data: …… // all fields from the object passed to addParamsToRequest
 *   count: 0 // 1 … 2 … 3 … increments with each call to sendData
 * }
 */

function addParamsToRequest(params) {
  let count = 0; // Counter to track the number of calls

  return function (data) {
    count++; // Increment the counter on each call
    return {
      ...params,
      data: data,
      count: count,
    };
  };
}

// Example usage
const sendData = addParamsToRequest({ 'access-token': 'qwerty' });

// Calling the function
const result1 = sendData({ username: 'john_doe', email: 'john@example.com' });
console.log(result1);

const result2 = sendData({ product: 'Laptop', price: 1200, currency: 'USD' });
console.log(result2);

const result3 = sendData({ temperature: 22, humidity: 60, city: 'New York' });
console.log(result3);
