const express = require("express");
const debug = require("debug")("pulse:coachesController");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  createCoach,
  getCoachByEmail,
  getCoachById,
  getAllCoaches,
} = require("../db/coach-db");
const {
  getBookingsByCoachId,
  cancelCoachBooking,
} = require("../db/booking-db");
const { verifyToken } = require("../middleware/verify-token");

const SALT_LENGTH = 12;

const createJWT = (coach) => {
  const payload = {
    email: coach.email,
    id: coach.id,
  };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: "2h" };
  return jwt.sign(payload, secret, options);
};

// coach signup
router.post("/signup", async (req, res) => {
  const {
    email,
    name,
    password,
    location,
    sports,
    experience,
    rate_per_hour,
    bio,
    profilepicture,
  } = req.body;

  try {
    const existingCoach = await getCoachByEmail(email);

    if (existingCoach) {
      return res.status(400).json({ error: "email already in use!" });
    }

    const hashedpassword = await bcrypt.hash(password, SALT_LENGTH);
    const newCoach = await createCoach(
      email,
      name,
      hashedpassword,
      location,
      sports,
      experience,
      rate_per_hour,
      bio,
      profilepicture,
    );
    const token = createJWT(newCoach);

    return res.status(201).json({ coach: newCoach, token });
  } catch (error) {
    debug("error during signup: %O", error);
    console.log(error);
    console.log("db url:", process.env.DATABASE_URL);

    return res.status(400).json({ error: error.message });
  }
});

// coach login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const coach = await getCoachByEmail(email);
    console.log("coach object:", coach);
    if (coach === null) {
      return res.status(401).json({ error: "your email does not exist!" });
    }
    const match = await bcrypt.compare(password, coach.hashedpassword);
    if (match) {
      const token = createJWT(coach);
      debug("login token success: %0", token);
      return res.status(200).json({ token });
    }
    res.status(401).json({ error: "invalid email or password" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get all coaches
router.get("/", verifyToken, async (req, res) => {
  try {
    const coaches = await getAllCoaches();
    res.json({ coaches });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// coaches verify token
router.get("/:coachId", verifyToken, async (req, res) => {
  const { coachId } = req.params;

  try {
    // if (!req.coach) {
    //   return res.status(401).json({ error: "unauthorized" });
    // }
    console.log("received coachid", coachId);
    const coach = await getCoachById(coachId);
    console.log("coach object:", coach);

    if (coachId === null) {
      return res.status(401).json({ error: "coach id does not exist!" });
    }
    res.json({ coach });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// coach get all bookings
router.get("/bookings/:coachId", verifyToken, async (req, res) => {
  const coach_id = req.coach.id;

  if (!coach_id) {
    return res.status(401).json({ error: "unauthorized" });
  }

  try {
    const bookings = await getBookingsByCoachId(coach_id);
    res.json(bookings);
  } catch (error) {
    console.error("error fetching bookings:", error);
    res.status(500).json({ error: error.message });
  }
});

// coach cancel booking
router.delete("/bookings/:bookingId", verifyToken, async (req, res) => {
  const coach_id = req.coach.id;
  const { bookingId } = req.params;

  try {
    const deletedBooking = await cancelCoachBooking(coach_id, bookingId);
    if (deletedBooking) {
      return res.status(200).json(deletedBooking);
    } else {
      res.status(404).json({ error: "booking not found" });
    }
  } catch (error) {
    console.error("error cancelling booking:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
