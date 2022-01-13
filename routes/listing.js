const express = require('express');
const { createNewListing } = require('../server/database/createNewListing');
const { deleteListing } = require('../server/database/deleteListing');
const { markAsSoldListing } = require('../server/database/markAsSoldListing');
const router  = express.Router();

module.exports = (db) => {

  router.post('/create-listing', (req, res) => {
    const body = req.body;

    if (!body.title || !body.description || !body.image_url || !body.condition || !body.category) {
      res.status(400).send('Error. Listing is not created: missing field.');
      return;
    }

    if (!(body.price > 0)) {
      res.status(400).send('Error - listing is not created: invalid price.');
      return;
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

  router.post('/sold-listing', (req, res) => {
    const body = req.body;
    const listingId = body.listingId

    //Mark listing as sold
    markAsSoldListing(db, '1', listingId).then(result => {
      res.redirect('/my-listings')
    })
    .catch(e => {
      console.log(e);
      res.status(400).send('Error!');
    })
  });

  router.post('/delete-listing', (req, res) => {
    const body = req.body;
    const listingId = body.listingId;

    //Delete listing
    deleteListing(db, '1', listingId).then(result => {
      res.redirect(result.is_sold ? '/sold-listings' : '/my-listings')
    })
    .catch(e => {
      console.log(e);
      res.status(400).send('Error!');
    })
  });

  return router;
};
