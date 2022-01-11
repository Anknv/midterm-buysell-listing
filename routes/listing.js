const express = require('express');
const { createNewListing } = require('../server/database/createNewListing');
const router  = express.Router();

module.exports = (db) => {

  router.post('/create-listing', (req, res) => {
    const body = req.body;

    if (!body.title || !body.description || !body.image || !body.condition || !body.category) {
      res.status(400).send('Error. Listing is not created: missing field.');
    }

    if (!(body.price > 0)) {
      res.status(400).send('Error - listing is not created: invalid price.');
    }

    //Create new listing
    createNewListing(db, '1', body).then(result => {
      res.redirect('/my-listings')
    })
    .catch(e => {
      console.log(e);
      res.status(400).send('Error - listing is not created.');
    })
  });

  return router;
};
