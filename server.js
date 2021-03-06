const express = require("express");
process.env.NODE_ENV !== "production" ? require("dotenv").config() : null;
const cors = require("cors");
const passport = require("passport");
const http = require("http");

const userRoutes = require("./routes/api/user");
const gameRoutes = require("./routes/api/game");
const disciplinaRoutes = require("./routes/api/disciplina");
const regraRoutes = require("./routes/api/regra");
const tarefaRoutes = require("./routes/api/tarefa");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
require("./config/passport")(passport);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/disciplina", disciplinaRoutes);
app.use("/api/regra", regraRoutes);
app.use("/api/tarefa", tarefaRoutes);

app.use("/", (req, res) => {
  res.status(404).send("Route not found");
});

setInterval(() => {
  http.get("http://gameduc-api.herokuapp.com/api");
}, 600000);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
