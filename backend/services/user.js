const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

async function registerUser(user) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  const insertUserQuery = `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING id, email
    `;

  const values = [user.email, hashedPassword];

  try {
    const result = await db.client.query(insertUserQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error registering user", error);
    throw new Error("Error registering user");
  }
}

async function login(credentials) {
  const getUserQuery = `
      SELECT id, email, password
      FROM users
      WHERE email = $1
    `;

  try {
    const result = await db.client.query(getUserQuery, [credentials.email]);
    const user = result.rows[0];

    if (!user) {
      throw new Error("This email is not registered");
    }

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (isPasswordValid) {
      const token = generateJWT(user.id);
      return {
        email: user.email,
        token: token,
      };
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error("Error logging in", error);
    throw new Error("Error logging in");
  }
}

async function getMe(id) {
  const getUserQuery = `
      SELECT id, email
      FROM users
      WHERE id = $1
    `;

  try {
    const result = await db.client.query(getUserQuery, [id]);
    const me = result.rows[0];

    if (!me) {
      throw new Error("User not found for this id");
    }

    return me;
  } catch (error) {
    console.error("Error fetching user", error);
    throw new Error("Error fetching user");
  }
}

function generateJWT(id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });
}

module.exports = {
  registerUser,
  login,
  getMe,
};
