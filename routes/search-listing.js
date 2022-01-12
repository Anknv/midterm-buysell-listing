const express = require('express');
const { searchListings } = require('../server/database/searchListings');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const body = req.body;
    console.log("Search Listings");
    //Search All Listings
    searchListings(db, '1', body).then(result => {

      res.render("search-listings",{listings:result});
    })
    .catch(e => {
      console.log(e);
      res.status(400).send('Error!');
    })
  });

  return router;
};
