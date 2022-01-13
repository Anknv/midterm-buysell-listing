/**
 * Add a listing to the database.
 * @param {*} db Database pool connection.
 * @param {*} user_id A logged in user creating the listing.
 * @param {*} listing An object containing all of the listing details.
 * @returns {Promise<[{}]>} A promise to the listing.
 */

 const addLikes = function(db, user_id = '1', listing) {
   console.log(listing);
   const queryParams = [];
   queryParams.push(Number(user_id));
   queryParams.push(Number(listing.listing_id));
   console.log('addLikes');
   let queryString = (`INSERT INTO listing_likes (user_id,listing_id)
   VALUES ($1, $2) RETURNING *;`)

  return db
    .query(queryString,queryParams)
    .then((result) => result.rows[0]);
};

exports.addLikes = addLikes;
