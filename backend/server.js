require("dotenv").config();
const express = require("express");
const debug = require("debug")("pulse:server");
const usersController = require("./controllers/users");
const coachesController = require("./controllers/coaches");
const availabilitiesController = require("./controllers/availability");
const emailsController = require("./controllers/emails");
const { pool } = require("./db");

const port = 3000;
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  req.pool = pool;
  next();
});

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/api/user", usersController);
app.use("/api/coach", coachesController);
app.use("/api/coach/availability", availabilitiesController);
app.use("/api/email", emailsController);

app.listen(port, () => {
  debug(`Pulse app listening on port ${port}`);
});
