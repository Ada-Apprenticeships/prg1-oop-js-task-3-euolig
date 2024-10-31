const PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };

function validInteger(value) {
  if (typeof value === 'string') {
    const valueInteger = parseInt(value, 10);
    return valueInteger >= 0 && valueInteger.toString() === value;
  }
  return Number.isInteger(value)  && value>= 0;
}

function validatePriority(priority) {
  const numPriority = typeof priority === 'string' ? parseInt(priority, 10) : priority;
  if (Object.values(PRIORITY).includes(numPriority)) {
    return numPriority; // Return valid priority
  }
  return PRIORITY["LOW"]; // Default to LOW if invalid
}

function todaysDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

class Task {
  #title
  #priority
  #added
  constructor(title, priority) {
    this.#title = title;
    this.#priority = validatePriority(priority);
    this.#added = todaysDate(); // Set the added date
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

class ToDo {
  constructor() {
    this.tasks = [];
  }
  add(task) {
    this.tasks.push(task);
    return this.tasks.length; // Return the count of tasks
  }
  remove(title) {
    const index = this.tasks.findIndex(task => task.title.toLowerCase() === title.toLowerCase());
    if (index !== -1) {
      this.tasks.splice(index, 1); // Remove the task
      return true; // Task successfully removed
    }
    return false; // Task not found
  }
  list(priority = 0) {
    return this.tasks
      .filter(task => priority === 0 || task.priority === priority)
      .map(task => [task.added, task.title, task.priority]);
  }
  task(title) {
    const foundTask = this.tasks.find(task => task.title.toLowerCase() === title.toLowerCase());
    if (!foundTask) throw new Error(`Task '${title}' Not Found`);
    return foundTask;
  }
}

// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
};
