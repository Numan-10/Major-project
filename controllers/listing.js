const listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const MapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: MapToken });
module.exports.index = async (req, res) => {
  const allListings = await listing.find({});
  res.render("listings/index.ejs", { allListings });
};

//New
module.exports.renderNewForm = (req, res) => {
  // res.send("Working")
  // console.log(req.user);
  //using middleware for isAuthenticated()
  // if (!req.isAuthenticated()) {
  //   req.flash("error", "Yoy must be logged in to create listings!");
  //   return res.redirect("/login");
  // }

  res.render("listings/new.ejs");
};

//Show
module.exports.showListing = async (req, res) => {
  // res.send("Working")
  let { id } = req.params;
  const data = await listing
    .findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  // console.log(data);
  if (!data) {
    req.flash("error", "Listing you requested for doesn't exist");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { data });
};

//Create

module.exports.createListing = async (req, res, next) => {
  //let {title,description,price,image,country,location}=req.body
  // let listing=req.body;
  // console.log(listing); ///this will return listing object
  // if (!req.body.listing) {
  //   throw new ExpressError(400, "Send Valid Data for Listings");
  // }
  let response = await geocodingClient
    .forwardGeocode({
      // query: "New Delhi, India",
      query: req.body.listing.location,
      limit: 1,
    })
    .send();
  // console.log(response.body.features[0].geometry);
  // res.send("Done!");

  let Url = req.file.path;
  let filename = req.file.filename;
  // console.log(Url, "..", filename);
  const newListing = new listing(req.body.listing); // this will access that and will add that to database
  //req.body.listing is in the form of object "new lisiting({})"
  newListing.owner = req.user._id;
  newListing.image = { Url, filename };
  newListing.geometry = response.body.features[0].geometry; //Comming from Map box
  // console.log(newListing.geometry);
  let savedListing = await newListing.save();
  console.log(savedListing);
  // console.log(newListing.owner);
  req.flash("success", "New Listing Successfully Created!");
  return res.redirect("/listings");
};

//Edit form
module.exports.renderEditForm = async (req, res) => {
  // res.send("Working!")
  let { id } = req.params;
  const Listing = await listing.findById(id);
  if (!Listing) {
    req.flash("error", "Listing you requested for doesn't exist");
    res.redirect("/listings");
  }
  // console.log(Listing.image.Url);
  let originalImageUrl = Listing.image.Url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_250,w_300");
  // console.log(originalImageUrl);
  res.render("listings/edit.ejs", { Listing, originalImageUrl });
};

//Update
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let list = await listing.findByIdAndUpdate(id, { ...req.body.listing }); //deconstruct kr k individual parameter me convert kiya
  // const listing = req.body.listings;/

  if (typeof req.file !== "undefined") {
    let Url = req.file.path;
    let filename = req.file.filename;
    list.image = { Url, filename };
    await list.save();
  }
  if (!req.body.listing) {
    throw new ExpressError(400, "Send Valid Data for Listings");
  }
  req.flash("success", "Listing Updated Succesfully!");
  res.redirect(`/listings/${id}`);
};

//Delete
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await listing.findByIdAndDelete(id);
  req.flash("success", "Listening Deleted!");
  res.redirect("/listings");
};
