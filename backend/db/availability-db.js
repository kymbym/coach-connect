const { pool } = require("../db");

const createAvailability = async (
  coach_id,
  date,
  start_time,
  end_time,
  max_participants,
) => {
  try {
    const result = await pool.query(
      `INSERT INTO availability (coach_id, max_participants, date, start_time, end_time, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, now(), now())
       RETURNING *`,
      [coach_id, max_participants, date, start_time, end_time],
    );
    return result.rows[0];
  } catch (error) {
    console.error("error creating coach availability:", error);
    throw error;
  }
};

module.exports = { createAvailability };
