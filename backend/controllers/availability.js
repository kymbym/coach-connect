const express = require("express");
const debug = require("debug")("pulse:availabilitiesController");
const router = express.Router();
const {
  createAvailability,
  getAvailabilitiesByCoachId,
  updateAvailability,
  deleteAvailability,
  getAllAvailabilities,
} = require("../db/availability-db");
const { verifyToken } = require("../middleware/verify-token");

// users get all availabilities
router.get("/all", verifyToken, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "unauthorized" });
  }
  if (req.user) {
    try {
      const availabilities = await getAllAvailabilities();
      res.json(availabilities);
    } catch (error) {
      console.error("error fetching all availabilities:", error);
      res.status(500).json({ error: error.message });
    }
  }
});

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

// coaches get all availabilities
router.get("/:coachId", verifyToken, async (req, res) => {
  if (!req.coach) {
    return res.status(401).json({ error: "unauthorized" });
  }
  if (req.coach) {
    const coach_id = req.coach.id;
    try {
      const availabilities = await getAvailabilitiesByCoachId(coach_id);
      res.json(availabilities);
    } catch (error) {
      console.error("error fetching availabilities:", error);
      res.status(500).json({ error: error.message });
    }
  }
});

// coaches update availability
router.put("/:availabilityId", verifyToken, async (req, res) => {
  const coach_id = req.coach.id;
  const { date, start_time, end_time, max_participants } = req.body;
  const availability_id = req.params.availabilityId;

  try {
    const updatedAvailability = await updateAvailability(
      coach_id,
      availability_id,
      date,
      start_time,
      end_time,
      max_participants,
    );

    return res.status(200).json(updatedAvailability);
  } catch (error) {
    console.error("error updating availability:", error);
    return res.status(500).json({ error: error.message });
  }
});

// coaches delete availability
router.delete("/:availabilityId", verifyToken, async (req, res) => {
  const coach_id = req.coach.id;
  const availability_id = req.params.availabilityId;

  try {
    const deletedAvailability = await deleteAvailability(
      coach_id,
      availability_id,
    );
    if (deletedAvailability) {
      return res.status(200).json(deletedAvailability);
    } else {
      return res.status(404).json({ error: "availability not found" });
    }
  } catch (error) {
    console.error("error deleting availability:", error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
