const express = require("express");
const debug = require("debug")("coach-connect:availabilitiesController");
const router = express.Router();
const { createAvailability } = require("../db/availability-db");
const { verifyToken } = require("../middleware/verify-token");

// coaches create availability
router.post("/", verifyToken, async (req, res) => {
  const { date, start_time, end_time, max_participants } = req.body;
  const coach_id = req.coach.id;

  try {
    const newAvailability = await createAvailability(
      coach_id,
      date,
      start_time,
      end_time,
      max_participants,
    );
    res.status(201).json(newAvailability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
