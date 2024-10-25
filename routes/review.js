const express = require("express");
const router = express.Router({ mergeParams: true });
const listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync.js");
const review = require("../models/review.js");
const reviewController = require("../controllers/review.js");
const {
  validateReview,
  isLoggedIn,
  isreviewAuthor,
} = require("../Middleware.js");

//Reviews
//Post Review Route

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

//Delete Review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isreviewAuthor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;
