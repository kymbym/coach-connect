const { pool } = require("../db");

const createAvailability = async (
  coach_id,
  date,
  start_time,
  end_time,
  max_participants,
) => {
  console.log("creating availability with:", {
    coach_id,
    date,
    start_time,
    end_time,
    max_participants,
  });
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

const getAllAvailabilities = async () => {
  try {
    const { rows: availabilities } = await pool.query(
      `SELECT * FROM availability`,
    );
    return availabilities;
  } catch (error) {
    console.error("error fetching all availabilities:", error);
    throw error;
  }
};

const getAvailabilitiesByCoachId = async (coach_id) => {
  try {
    const { rows: availabilities } = await pool.query(
      `SELECT * FROM availability WHERE coach_id = $1`,
      [coach_id],
    );
    return availabilities;
  } catch (error) {
    console.error("error fetching availabilities by coach id:", error);
    throw error;
  }
};

const updateAvailability = async (
  coach_id,
  availability_id,
  date,
  start_time,
  end_time,
  max_participants,
) => {
  try {
    const { rows: availabilities } = await pool.query(
      `UPDATE availability
      SET date = $1, start_time = $2, end_time = $3, max_participants = $4, updated_at = now()
      WHERE id = $5 AND coach_id = $6
      RETURNING *`,
      [date, start_time, end_time, max_participants, availability_id, coach_id],
    );

    return availabilities[0];
  } catch (error) {
    console.error("error updating availability:", error);
  }
};

const deleteAvailability = async (coach_id, availability_id) => {
  try {
    const { rows: availabilities } = await pool.query(
      `DELETE FROM availability WHERE id = $1 AND coach_id = $2`,
      [availability_id, coach_id],
    );
    return availabilities;
  } catch (error) {
    console.error("error deleting availability:", error);
    throw error;
  }
};

module.exports = {
  createAvailability,
  getAvailabilitiesByCoachId,
  updateAvailability,
  deleteAvailability,
  getAllAvailabilities,
};
