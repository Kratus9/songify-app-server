const express = require("express");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const app = express();
const PORT = process.env.PORT || 3000;
const db = mongoose.connection;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");
const indexRoutes = require("./routes/indexRoutes");

require("dotenv").config();

const url = process.env.MONGODB_URI;

mongoose.connect(url);

db.on("error", console.error.bind(console, "db connection error"));
db.once("open", () => {
  console.log("Connected to DataBase");
});

app.use(cors());

app.use("/api", indexRoutes);

// Middleware for parsing JSON in request
app.use(express.json());

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
