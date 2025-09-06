// routes/authRoutes.js
const express = require("express");
const passport = require("passport");
const { getHome, logout } = require("../Controllers/authController.js");

const router = express.Router();

// Home route
router.get("/", getHome);

// Google OAuth login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback
router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
  res.redirect("http://localhost:5173/home");


  }
);

// Logout
router.get("/logout", logout);

module.exports = router;
