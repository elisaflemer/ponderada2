const db = require('../config/db');

async function createTaskTable() {
  const createTaskTableQuery = `
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) NOT NULL,
        text TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE, -- Added completed field
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

  try {
    await db.client.query(createTaskTableQuery);
    console.log("Tasks table created");
  } catch (error) {
    console.error("Error creating goal table", error);
  }
}

createTaskTable();
