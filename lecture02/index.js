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

/*
 * Contexts and 'this':
 *
 * You have an object with a method `getData` that logs a person's name and age.
 * Your task is to call this method in such a way that the name and age are specified.
 * The actual values of the name and age do not matter.
 *
 * Afterward, create a function that will invoke this method each time it is called.
 *
 * Example:
 *
 * const obj = {
 *   getData: function () {
 *     console.log(`Person name is: ${this.name} and age ${this.age}`);
 *   }
 * };
 *
 * The `getData` method should output the provided name and age.
 * Then, create a function that continuously invokes this method.
 */

// Creating an object with the getData method
const obj = {
  name: 'Alice',
  age: 25,
  getData: function () {
    console.log(`Person name is: ${this.name} and age ${this.age}`);
  },
};

// Directly invoking the getData method of the object
obj.getData();

// Creating a function that will repeatedly call obj.getData
const getPersonInfo = function () {
  obj.getData();
};

// Now calling the new function, which will call the getData method each time
getPersonInfo();
getPersonInfo();

/*
 * Recursion:
 *
 * You have an object representing a file system structure with folders and files.
 * Your task is to recursively traverse this object, find all files,
 * and return their names in an array.
 *
 * Example:
 *
 * const root = {
 *   name: 'name',
 *   type: 'folder',
 *   children: [
 *     {
 *       name: 'folder 1',
 *       type: 'folder',
 *       children: [
 *         {
 *           name: 'folder 2',
 *           type: 'folder',
 *           children: [
 *             {
 *               name: 'file 3',
 *               type: 'file',
 *               size: 30
 *             }
 *           ]
 *         }
 *       ]
 *     },
 *     {
 *       name: 'file 1',
 *       type: 'file',
 *       size: 10
 *     },
 *     {
 *       name: 'file 2',
 *       type: 'file',
 *       size: 20
 *     }
 *   ]
 * };
 *
 * The function should return an array of file names:
 * ['file 1', 'file 2', 'file 3']
 */

const root = {
  name: 'name',
  type: 'folder',
  children: [
    {
      name: 'folder 1',
      type: 'folder',
      children: [
        {
          name: 'folder 2',
          type: 'folder',
          children: [
            {
              name: 'file 3',
              type: 'file',
              size: 30,
            },
          ],
        },
      ],
    },
    {
      name: 'file 1',
      type: 'file',
      size: 10,
    },
    {
      name: 'file 2',
      type: 'file',
      size: 20,
    },
  ],
};

function findFiles(node) {
  let fileNames = [];

  // Check if the current node is a file
  if (node.type === 'file') {
    fileNames.push(node.name);
  } else if (node.children) {
    // If it's a folder, recursively search its children
    node.children.forEach((child) => {
      fileNames = fileNames.concat(findFiles(child));
    });
  }

  return fileNames;
}

const files = findFiles(root);
console.log(files);
