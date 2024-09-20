const jwt = require("jsonwebtoken");
const { pool } = require("../db");

const setCoach = (req, coach) => {
  req.coach = coach;
};

const setUser = (req, user) => {
  req.user = user;
};

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded token", decoded);

    const coachResult = await pool.query(
      "SELECT id, name, email FROM coaches WHERE id = $1",
      [decoded.id],
    );

    if (coachResult.rows.length > 0) {
      setCoach(req, coachResult.rows[0]);
      return next();
    }

    const userResult = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [decoded.id],
    );

    if (userResult.rows.length > 0) {
      setUser(req, userResult.rows[0]);
      return next();
    }
    return res.status(401).json({ error: "invalid authorization token" });
  } catch (error) {
    console.error("token verification error:", error);
    return res.status(401).json({ error: "invalid authorization token" });
  }
};

module.exports = { verifyToken };
