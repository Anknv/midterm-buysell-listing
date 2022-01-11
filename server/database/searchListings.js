/**
 * Add a listing to the database.
 * @param {*} db Database pool connection.
 * @param {*} user_id A logged in user creating the listing.
 * @param {*} listing An object containing all of the listing details.
 * @returns {Promise<[{}]>} A promise to the listing.
 */

 const searchListings = function(db, user_id, listing) {
   const queryPramas = [];
   let queryString =`SELECT * FROM listings`;

   if (listing.title && listing.category && listing.minimum_price && listing.maximum_price) {
    queryParams.push(`%${listing.title}%`);
    queryParams.push(`${listing.category}`);
    queryParams.push(`${listing.minimum_price}`);
    queryParams.push(`${listing.maximum_price}`);
    queryString += `WHERE title LIKE $${queryParams.length - 3}
    AND category ${queryParams.length - 2}
    AND price BETWEEN $${queryParams.length - 1} AND $${queryParams.length}`;
   } else if (listing.title && listing.category && listing.minimum_price) {
    queryParams.push(`%${listing.title}%`);
    queryParams.push(`${listing.category}`);
    queryParams.push(`${listing.minimum_price}`);
    queryString += `WHERE title LIKE $${queryParams.length - 2}
    AND category ${queryParams.length - 1}
    AND price >= $${queryParams.length}`;
   } else if (listing.title && listing.category && listing.maximum_price) {
    queryParams.push(`%${listing.title}%`);
    queryParams.push(`${listing.category}`);
    queryParams.push(`${listing.maximum_price}`);
    queryString += `WHERE title LIKE $${queryParams.length - 2}
    AND category ${queryParams.length - 1}
    AND price <= $${queryParams.length}`;
   } else if (listing.title && listing.category) {
    queryParams.push(`%${listing.title}%`);
    queryParams.push(`${listing.category}`);
    queryString += `WHERE title LIKE $${queryParams.length - 1}
    AND category ${queryParams.length}`;
   } else if (listing.title) {
    queryParams.push(`%${listing.title}%`);
    queryString += `WHERE title LIKE $${queryParams.length}`;
   }
   console.log(queryString,queryParams);
  return db
    .query(queryString,queryParams)
    .then((result) => result.rows[0]);
};

exports.searchListings = searchListings;
