const express = require("express");
const debug = require("debug")("pulse:server");
const usersController = require("./controllers/users");
const coachesController = require("./controllers/coaches");
const availabilitiesController = require("./controllers/availability");
const { pool } = require("./db");

const app = express();
const port = 3000;

app.use((req, res, next) => {
  req.pool = pool;
  next();
});

app.use(express.json());
app.use("/api/user", usersController);
app.use("/api/coach", coachesController);
app.use("/api/coach/availability", availabilitiesController);

app.listen(port, () => {
  debug(`Pulse app listening on port ${port}`);
});
