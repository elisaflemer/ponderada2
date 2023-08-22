const db = require('../config/db');

async function createUserTable() {
  const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

  try {
    await db.client.query(createUserTableQuery);
    console.log("User table created");
  } catch (error) {
    console.error("Error creating user table", error);
  }
}

createUserTable();
