// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const listingRoutes = require("./routes/listing");
const searchListings = require("./routes/search-listing")
const { getAllListings } = require("./server/database/getListings");
const { getWishListings } = require("./server/database/getWishListings");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/listings", listingRoutes(db));
app.use("/api/search-listings",searchListings(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  getAllListings(db, {}).then(result => {
    res.render("index", { listings: result });
  })
});

// Rendering the new-listing form
app.get("/new-listing", (req, res) => {
  res.render("create-listing");
});

// Rendering my listings
app.get("/my-listings", (req, res) => {
  getAllListings(db, { user_id: '1' }).then(result => {
    res.render("my-listings", { listings: result, sold: false });
  })
});

app.get("/sold-listings", (req, res) => {
  getAllListings(db, { user_id: '1', only_show_sold: true }).then(result => {
    res.render("my-listings", { listings: result, sold: true });
  })
});

// Rendering the search form
app.get("/search", (req, res) => {
  res.render("search-form");
});

// Rendering WishList page
app.get("/my-wishlist", (req, res) => {
  getWishListings(db,{user_id:'1'}).then(result => {
    res.render("wish-listings",{listings: result,sold: false});
  })
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
