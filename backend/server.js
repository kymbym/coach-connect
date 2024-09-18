const express = require("express");
const dotenv = require("dotenv");
const debug = require("debug")("coach-connect:server");

dotenv.config();

const app = express();
const port = 3000;

const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  debug("Connected to PostgreSQL");
});

app.use(express.json());

app.listen(port, () => {
  console.log(`Coach connect app listening on port ${port}`);
});
