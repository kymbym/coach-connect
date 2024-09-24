const express = require("express");
const debug = require("debug")("pulse:usersController");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail, getUserById } = require("../db/user-db");
const {
  createBooking,
  getBookingsByUserId,
  cancelUserBooking,
} = require("../db/booking-db");
const { verifyToken } = require("../middleware/verify-token");

const SALT_LENGTH = 12;

const createJWT = (user) => {
  const payload = {
    email: user.email,
    id: user.id,
  };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: "2h" };
  return jwt.sign(payload, secret, options);
};

// user signup
router.post("/signup", async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ error: "email already in use!" });
    }

    const hashedpassword = await bcrypt.hash(password, SALT_LENGTH);
    const newUser = await createUser(email, name, hashedpassword);
    const token = createJWT(newUser);

    return res.status(201).json({ user: newUser, token });
  } catch (error) {
    debug("error during signup: %O", error);
    console.log(error);
    console.log("db url:", process.env.DATABASE_URL);

    return res.status(400).json({ error: error.message });
  }
});

// user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    console.log("user object:", user);

    if (user === null) {
      return res.status(401).json({ error: "your email does not exist!" });
    }
    const match = await bcrypt.compare(password, user.hashedpassword);
    if (match) {
      const token = createJWT(user);
      debug("login token success: %0", token);
      return res.status(200).json({ token });
    }
    res.status(401).json({ error: "invalid email or password" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// user verify token
router.get("/:userId", verifyToken, async (req, res) => {
  const { id } = req.user;

  try {
    if (!req.user) {
      return res.status(401).json({ error: "unauthorized" });
    }

    const user = await getUserById(id);
    console.log("user object:", user);

    if (id === null) {
      return res.status(401).json({ error: "user id does not exist!" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// user create booking
router.post("/bookings", verifyToken, async (req, res) => {
  console.log("decoded user id in users controllers", req.user?.id);
  console.log("request body user create booking:", req.body);
  const { availability_id } = req.body;
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(401).json({ error: "unauthorized" });
  }
  console.log(req.body);

  try {
    const booking = await createBooking(user_id, availability_id);
    res.status(201).json(booking);
  } catch (error) {
    console.error("error creating booking:", error);
    res.status(500).json({ error: error.message });
  }
});

// user get all bookings
router.get("/bookings/:userId", verifyToken, async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(401).json({ error: "unauthorized" });
  }

  try {
    const bookings = await getBookingsByUserId(userId);
    res.json(bookings);
  } catch (error) {
    console.error("error fetching bookings:", error);
    res.status(500).json({ error: error.message });
  }
});

// user cancel booking
router.delete("/bookings/:bookingId", verifyToken, async (req, res) => {
  const user_id = req.user.id;
  const { bookingId } = req.params;

  try {
    const deletedBooking = await cancelUserBooking(user_id, bookingId);
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
