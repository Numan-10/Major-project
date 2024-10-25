const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../Middleware.js");
const userController = require("../controllers/user.js");

router
  .route("/signup")
  .get(userController.renderSignupform)
  .post(userController.signup);

router
  .route("/login")
  .get( (req, res) => {
    res.render("users/login.ejs");
  })
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

router.get("/logout", userController.logout);

module.exports = router;
