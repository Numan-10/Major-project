const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../Middleware.js");
const userController = require("../controllers/user.js");

router.get("/signup", userController.renderSignupform);

router.post("/signup", userController.signup);

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

router.get("/logout", userController.logout);

module.exports = router;
