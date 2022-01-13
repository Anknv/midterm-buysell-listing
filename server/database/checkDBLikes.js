/**
 * Add a listing to the database.
 * @param {*} db Database pool connection.
 * @param {*} user_id A logged in user creating the listing.
 * @param {*} listing An object containing all of the listing details.
 * @returns {Promise<[{}]>} A promise to the listing.
 */

 const checkDBLikes = function(db, user_id = '1', listing) {
  const queryParams = [];
  queryParams.push(Number(user_id));
  queryParams.push(Number(listing.listing_id));
  let queryString =`SELECT * FROM listing_likes
  WHERE user_id = $${queryParams.length-1} AND listing_id = $${queryParams.length}`;
  console.log(queryString,queryParams);
  return db.query(queryString,queryParams)
  .then((result) => result);
};

exports.checkDBLikes = checkDBLikes;
