const { pool } = require("../db");

const createBooking = async (
  user_id,
  availability_id,
  start_time,
  end_time,
) => {
  try {
    const { rows: availability } = await pool.query(
      `SELECT coach_id FROM availability WHERE id = $1`,
      [availability_id],
    );

    if (availability.length === 0) {
      throw Error("availability not found");
    }

    const coach_id = availability[0].coach_id;

    const { rows: bookings } = await pool.query(
      `INSERT INTO bookings (user_id, coach_id, availability_id, start_time, end_time, status, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, 'pending', now(), now())
      RETURNING *`,
      [user_id, coach_id, availability_id, start_time, end_time],
    );

    return bookings[0];
  } catch (error) {
    console.error("error creating booking:", error);
    throw error;
  }
};

const getBookingsByUserId = async (user_id) => {
  try {
    const { rows: bookings } = await pool.query(
      `SELECT * FROM bookings WHERE user_id = $1`,
      [user_id],
    );
    return bookings;
  } catch (error) {
    console.error("error fetching bookings by user id:", error);
    throw error;
  }
};

module.exports = { createBooking, getBookingsByUserId };
