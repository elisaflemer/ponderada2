const app = require("./app");
require("dotenv").config();
const db = require("./config/db");
require("./models/user");
require("./models/tasks");

db.connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running or port ${PORT}`));
