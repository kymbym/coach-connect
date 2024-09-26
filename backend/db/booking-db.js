const { pool } = require("../db");

const createBooking = async (user_id, availability_id) => {
  try {
    const { rows: bookings } = await pool.query(
      `INSERT INTO bookings (user_id, coach_id, availability_id, status, created_at, updated_at)
      VALUES ($1, (SELECT coach_id FROM availability WHERE id = $2), $2, 'upcoming', now(), now())
      RETURNING *`,
      [user_id, availability_id],
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
      `SELECT
        b.id,
        b.availability_id,
        a. date,
        a.start_time, 
        a.end_time, 
        a.max_participants,
        a.coach_id,
        c. name AS coach_name
      FROM bookings b
      JOIN availability a ON b.availability_id = a.id
      JOIN coaches c ON a.coach_id = c.id
      WHERE b.user_id = $1`,
      [user_id],
    );
    console.log("fetched bookings from booking db", bookings);
    return bookings;
  } catch (error) {
    console.error("error fetching bookings by user id:", error);
    throw error;
  }
};

const getBookingsByCoachId = async (coach_id) => {
  try {
    const { rows: bookings } = await pool.query(
      `SELECT 
        b.id,
        b.availability_id,
        b. user_id,
        a.date,
        a.start_time, 
        a.end_time, 
        a.max_participants,
        a.coach_id,
        u.name AS user_name, 
        u.email AS user_email, 
        c.name AS coach_name, 
        c.email AS coach_email 
       FROM bookings b
       JOIN availability a ON b.availability_id = a.id
       JOIN users u ON b.user_id = u.id
       JOIN coaches c ON a.coach_id = c.id
       WHERE b.coach_id = $1`,
      [coach_id],
    );
    console.log("fetched bookings from booking db coaches", bookings);
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
