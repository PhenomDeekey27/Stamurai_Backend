export async function TodoValidation({ title, dueDate, priority, status }) {
  return new Promise((resolve, reject) => {
    if (!title || typeof title !== "string") {
      return reject("Title must be a string");
    }

    if (!dueDate || isNaN(Date.parse(dueDate))) {
      return reject("Enter a valid date");
    }

    const normalizedPriority = priority?.toLowerCase();
    if (!normalizedPriority || !["low", "medium", "high"].includes(normalizedPriority)) {
      return reject("Please enter a valid priority (low, medium, high)");
    }

    const normalizedStatus = status?.toLowerCase();
    if (!normalizedStatus || !["pending", "in-progress", "completed"].includes(normalizedStatus)) {
      return reject("Select a valid status (pending, in-progress, completed)");
    }

    resolve();
  });
}
