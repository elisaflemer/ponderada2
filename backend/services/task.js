const db = require("../config/db");

async function getTasks(user_id) {
  const getTasksQuery = `
    SELECT *
    FROM tasks
    WHERE user_id = $1
  `;

  try {
    const result = await db.client.query(getTasksQuery, [user_id]);
    return result.rows;
  } catch (error) {
    console.error("Error getting tasks", error);
    throw new Error("Error getting tasks");
  }
}

async function createTask(task) {
  const createTaskQuery = `
    INSERT INTO tasks (user_id, text, completed)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const values = [task.user, task.text, task.completed || false];

  try {
    const result = await db.client.query(createTaskQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating task", error);
    throw new Error("Error creating task");
  }
}

async function updateTask(id, task) {
  const updateTaskQuery = `
    UPDATE tasks
    SET text = $1,
        completed = $2
    WHERE id = $3
    RETURNING *
  `;

  const values = [task.text, task.completed || false, id];

  try {
    const result = await db.client.query(updateTaskQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating task", error);
    throw new Error("Error updating task");
  }
}

async function deleteTask(id) {
  const deleteTaskQuery = `
    DELETE FROM tasks
    WHERE id = $1
    RETURNING *
  `;

  try {
    const result = await db.client.query(deleteTaskQuery, [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting task", error);
    throw new Error("Error deleting task");
  }
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
