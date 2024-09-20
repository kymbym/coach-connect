const express = require("express");
const debug = require("debug")("coach-connect:coachesController");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  createCoach,
  getCoachByEmail,
  getCoachById,
} = require("../db/coach-db");
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

// coaches verify token
router.get("/:coachId", verifyToken, async (req, res) => {
  const { id } = req.coach;

  try {
    if (!req.coach) {
      return res.status(401).json({ error: "unauthorized" });
    }

    const coach = await getCoachById(id);
    console.log("coach object:", coach);

    if (id === null) {
      return res.status(401).json({ error: "coach id does not exist!" });
    }
    res.json({ coach });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
