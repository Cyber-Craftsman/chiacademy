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

// Define an object with a method that utilizes its context (`this`)
const obj = {
  getData: function () {
    console.log(`Person name is: ${this.name} and age ${this.age}`);
  },
};

// Use call() to invoke getData with specific context immediately
obj.getData.call({ name: 'Alice', age: 25 });

// Bind getData to a specific context and create a reusable function
const boundGetData = obj.getData.bind({ name: 'John', age: 30 });
// Call the bound function
boundGetData();

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

/*
 * ES5 Implementation:
 *
 * Create a base object "Person" with properties:
 * - name
 * - phone
 *
 * Include a method "introduce" that logs:
 * "Hi, my name is {name}, my number is {phone}."
 *
 * Create objects "Student" and "Teacher" that inherit from "Person".
 *
 * For "Student", add a property "course" and a method "study" that logs:
 * "I study in {course} course."
 *
 * For "Teacher", add a property "subject" and a method "teach" that logs:
 * "I teach {subject}."
 */

// Base constructor function for PersonES5
function PersonES5(name, phone) {
  this.name = name;
  this.phone = phone;
}

// Method to introduce the person
PersonES5.prototype.introduce = function () {
  console.log(`Hi, my name is ${this.name}, my number is ${this.phone}.`);
};

// Constructor function for StudentES5
function StudentES5(name, phone, course) {
  PersonES5.call(this, name, phone); // Call the PersonES5 constructor
  this.course = course;
}

// Inherit from PersonES5
StudentES5.prototype = Object.create(PersonES5.prototype);
StudentES5.prototype.constructor = StudentES5;

// Method for StudentES5 to study
StudentES5.prototype.study = function () {
  console.log(`I study in ${this.course} course.`);
};

// Constructor function for TeacherES5
function TeacherES5(name, phone, subject) {
  PersonES5.call(this, name, phone); // Call the PersonES5 constructor
  this.subject = subject;
}

// Inherit from PersonES5
TeacherES5.prototype = Object.create(PersonES5.prototype);
TeacherES5.prototype.constructor = TeacherES5;

// Method for TeacherES5 to teach
TeacherES5.prototype.teach = function () {
  console.log(`I teach ${this.subject}.`);
};

// Create instances for ES5
const studentES5 = new StudentES5('Alice', '123-456-7890', 2);
const teacherES5 = new TeacherES5('Bob', '098-765-4321', 'Mathematics');

// Test the methods for ES5 instances
studentES5.introduce();
studentES5.study();
teacherES5.introduce();
teacherES5.teach();

/*
 * ES6 Implementation:
 *
 * Create a base class "Person" with properties:
 * - name
 * - phone
 *
 * Include a method "introduce" that logs:
 * "Hi, my name is {name}, my number is {phone}."
 *
 * Create classes "Student" and "Teacher" that extend "Person".
 *
 * For "Student", add a property "course" and a method "study" that logs:
 * "I study in {course} course."
 *
 * For "Teacher", add a property "subject" and a method "teach" that logs:
 * "I teach {subject}."
 */

// Base class for PersonES6
class PersonES6 {
  constructor(name, phone) {
    this.name = name;
    this.phone = phone;
  }

  // Method to introduce the person
  introduce() {
    console.log(`Hi, my name is ${this.name}, my number is ${this.phone}.`);
  }
}

// Class for StudentES6 that extends PersonES6
class StudentES6 extends PersonES6 {
  constructor(name, phone, course) {
    super(name, phone); // Call the PersonES6 constructor
    this.course = course;
  }

  // Method for StudentES6 to study
  study() {
    console.log(`I study in ${this.course} course.`);
  }
}

// Class for TeacherES6 that extends PersonES6
class TeacherES6 extends PersonES6 {
  constructor(name, phone, subject) {
    super(name, phone); // Call the PersonES6 constructor
    this.subject = subject;
  }

  // Method for TeacherES6 to teach
  teach() {
    console.log(`I teach ${this.subject}.`);
  }
}

// Create instances for ES6
const studentES6 = new StudentES6('Charlie', '987-654-3210', 3);
const teacherES6 = new TeacherES6('David', '567-890-1234', 'Physics');

// Test the methods for ES6 instances
studentES6.introduce();
studentES6.study();
teacherES6.introduce();
teacherES6.teach();
