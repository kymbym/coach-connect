const { pool } = require("../db");

const createBooking = async (user_id, availability_id) => {
  try {
    const { rows: availability } = await pool.query(
      `SELECT coach_id FROM availability WHERE id = $1`,
      [availability_id],
    );

    if (availability.length === 0) {
      throw new Error(`availability not found for id: ${availability_id}`);
    }

    const coach_id = availability[0].coach_id;

    const { rows: bookings } = await pool.query(
      `INSERT INTO bookings (user_id, coach_id, availability_id, status, created_at, updated_at)
      VALUES ($1, $2, $3, 'upcoming', now(), now())
      RETURNING *`,
      [user_id, coach_id, availability_id],
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

const getBookingsByCoachId = async (coach_id) => {
  try {
    const { rows: bookings } = await pool.query(
      `SELECT * FROM bookings WHERE coach_id = $1`,
      [coach_id],
    );
    return bookings;
  } catch (error) {
    console.error("error fetching bookings by coach id:", error);
  }
};

const cancelCoachBooking = async (coach_id, booking_id) => {
  try {
    const { rows: bookings } = await pool.query(
      `DELETE FROM bookings WHERE id = $1 AND coach_id = $2`,
      [booking_id, coach_id],
    );
    return bookings;
  } catch (error) {
    console.error("error deleting booking:", error);
  }
};

const cancelUserBooking = async (user_id, booking_id) => {
  try {
    const { rows: bookings } = await pool.query(
      `DELETE FROM bookings WHERE id = $1 AND user_id = $2`,
      [booking_id, user_id],
    );
    return bookings;
  } catch (error) {
    console.error("error deleting booking:", error);
  }
};

module.exports = {
  createBooking,
  getBookingsByUserId,
  getBookingsByCoachId,
  cancelCoachBooking,
  cancelUserBooking,
};
