const express = require("express");
const router = express.Router();
const listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../Middleware.js");
const listingController = require("../controllers/listing.js");
//Index route
router.get("/", wrapAsync(listingController.index));
// Create route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//show route
router.get("/:id", wrapAsync(listingController.showListing));

//Create route
router.post(
  "/",
  isLoggedIn,
  validateListing, //middleware of validation schema
  wrapAsync(listingController.createListing)
);

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

//Update Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing, //Middleware for Validation Schema
  wrapAsync(listingController.updateListing)
);

//Delete route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deleteListing)
);

module.exports = router;
