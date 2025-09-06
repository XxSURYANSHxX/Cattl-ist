// app.js
const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
require("./utils/passportSetup");

const app = express();

// Connect to MongoDB
connectDB();

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);

// Start server
app.listen(5000, () => console.log(`Server running on http://localhost:5000`));
