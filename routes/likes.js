const express = require('express');
const { searchListings, addLikes } = require('../server/database/addLikes');
const { checkDBLikes } = require('../server/database/checkDBLikes');
const { getUserFromSession } = require('../server/getUserFromSession');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const listing = req.body;
    // Add likes to listing_likes table
    //const checkDB = checkDBLikes(db,'1',listing);
    //console.log("CheckDB ",checkDB);

    const user = getUserFromSession(req.session);

    if (!user) {
      res.redirect('/login');
      return;
    }

    checkDBLikes(db, user.user_id, listing).
    then((resultCheck) => {
      const count = resultCheck.rowCount === undefined ? 0 : resultCheck.rowCount;
      console.log("Count",count);
      if (count > 0) {
      res.render("already-liked",{user: user});
    } else {
      addLikes(db, user.user_id, listing).then(result => {
        res.redirect("/my-wishlist");
        })
        .catch(e => {
        console.log(e);
        res.status(400).send('Error!');
      })
    }
  })
});
return router;
  //})
  //  if (checkDB.rowCount = 0 ) {
  //
  //  } else {
  //    res.status(400).send('Error - This item is already in your Wish List');
};
