const express = require('express');
const { searchListings } = require('../server/database/searchListings');
const { getUserFromSession } = require('../server/getUserFromSession');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const body = req.body;
    console.log("Search Listings");

    const user = getUserFromSession(req.session);

    if (!user) {
      res.redirect('/login');
      return;
    }

    //Search All Listings
    searchListings(db, user.user_id, body).then(result => {

      res.render("search-listings",{ listings:result, user: user });
    })
    .catch(e => {
      console.log(e);
      res.status(400).send('Error!');
    })
  });

  return router;
};
