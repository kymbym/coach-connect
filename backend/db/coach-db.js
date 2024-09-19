const { pool } = require("../db");

const createCoach = async (
  email,
  name,
  hashedpassword,
  location,
  sports,
  experience,
  rate_per_hour,
  bio,
) => {
  try {
    const { rows: coaches } = await pool.query(
      `INSERT into coaches (email, name, hashedpassword, location, sports, experience, rate_per_hour, bio, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, now(), now())
      RETURNING id, email, name, location, sports, experience, rate_per_hour, bio, created_at, updated_at`,
      [
        email,
        name,
        hashedpassword,
        location,
        sports,
        experience,
        rate_per_hour,
        bio,
      ],
    );
    return coaches[0];
  } catch (error) {
    console.error("error creating coach", error);
    throw error;
  }
};

const getCoachByEmail = async (email) => {
  try {
    const { rows: coaches } = await pool.query(
      `SELECT * FROM coaches WHERE email = $1`,
      [email],
    );

    if (coaches.length === 0) {
      return null;
    }

    return coaches[0];
  } catch (error) {
    console.error("error fetching coach by email", error);
    throw error;
  }
};

const getCoachById = async (id) => {
  try {
    const { rows: coaches } = await pool.query(
      `SELECT * FROM coaches where id = $1`,
      [id],
    );

    return coaches[0];
  } catch (error) {
    console.error("error fetching coach by id", error);
    throw error;
  }
};

module.exports = { createCoach, getCoachByEmail, getCoachById };
