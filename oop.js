// Object mapping priority levels to numerical values for comparison
const PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };

// Function to validate if a given value is a non-negative integer
function validInteger(value) {
  if (typeof value === 'string') {
    // Convert string to integer
    const valueInteger = parseInt(value, 10);
    // Check if conversion is successful and matches the original string
    return valueInteger >= 0 && valueInteger.toString() === value;
  }
  // For non-string types, check if value is a non-negative integer
  return Number.isInteger(value)  && value>= 0;
}
// Function to validate and return a priority level
function validatePriority(priority) {
  // Convert string priority to integer if necessary
  const priorityNum = typeof priority === 'string' ? parseInt(priority, 10) : priority;
  return Object.values(PRIORITY).includes(priorityNum) 
  ? priorityNum // If priority is valid, return the priority value
  :PRIORITY["LOW"]; // if invalid, default to LOW priority
}
// Function to get the current date and time as a formatted string
function todaysDate() {
  const now = new Date();
  // Extract day, month, and year, and ensure two-digit format
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = now.getFullYear();
  // Extract hours, minutes, and seconds, and ensure two-digit format
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  // Return the formatted date and time as dd/mm/yyyy hh:mm:ss
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
// Class representing a Task with a title, priority, and date added
class Task {
  #title;
  #priority;
  #added;

  constructor(title, priority) {
    this.#title = title; 
    this.#priority = validatePriority(priority); 
    this.#added = todaysDate();
  }

  get title() {
    return this.#title;
  }
  get priority() {
    return this.#priority;
  }
  get added() {
    return this.#added;
  }
  set priority(priority) {
    this.#priority = validatePriority(priority); // Validate before setting
  }
}
// Class representing a ToDo list containing multiple tasks
class ToDo {
  constructor() {
    this.tasks = []; // Initialise an empty array to store tasks
  }

  add(task) {
    // add a task to the task array and return the updated count of tasks
    this.tasks.push(task);
    return this.tasks.length;
  }

  remove(title) {
    // Find the index of the task with the matching title (case-insensitive)
    // and remove it returning true if it has been successfully removed and false otherwise
    const index = this.tasks.findIndex(task => task.title.toLowerCase() === title.toLowerCase());
    if (index !== -1) {
      this.tasks.splice(index, 1); 
      return true;
    }
    return false;
  }

  list(priority = 0) {
    // Filter and map the tasks to a 2D array by priority if specified, otherwise include all tasks
    return this.tasks
    .filter(task => priority === 0 || task.priority === priority)
    .map(task => [task.added, task.title, task.priority]);
  }

  task(title) {
    // Find the task with the matching title (case-insensitive) 
    // returning its title if found or throwing an error otherwise
    const foundTask = this.tasks.find(task => task.title.toLowerCase() === title.toLowerCase());
    if (!foundTask) {
      throw new Error(`Task '${title}' Not Found`);
    } 
    return foundTask; 
  } 
}

//Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
};
