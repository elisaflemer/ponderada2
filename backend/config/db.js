const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "banco-db",
  database: "postgres",
  password: "postgres",
  port: 5432, // Default PostgreSQL port
});

const connectDB = async () => {
  client
    .connect()
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((error) => {
      console.error("Error connecting to the database", error);
    });
};

module.exports = {connectDB, client};
