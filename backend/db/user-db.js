const { pool } = require("../db");

const createUser = async (email, name, hashedpassword) => {
  try {
    const { rows: users } = await pool.query(
      `INSERT into users (email, name, hashedpassword, created_at, updated_at)
      VALUES ($1, $2, $3, now(), now())
      RETURNING id, email, name, created_at, updated_at`,
      [email, name, hashedpassword],
    );
    return users[0];
  } catch (error) {
    console.error("error creating user", error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const { rows: users } = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
    );

    if (users.length === 0) {
      return null;
    }

    return users[0];
  } catch (error) {
    console.error("error fetching user by email", error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const { rows: users } = await pool.query(
      `SELECT * FROM users where id = $1`,
      [id],
    );

    return users[0];
  } catch (error) {
    console.error("error fetching user by id", error);
    throw error;
  }
};

module.exports = { createUser, getUserByEmail, getUserById };
