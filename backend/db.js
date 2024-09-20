const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

pool.on("error", (error) => {
  console.error(error);
  process.exit(-1);
});

module.exports = { pool };
