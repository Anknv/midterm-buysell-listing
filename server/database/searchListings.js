/**
 * Add a listing to the database.
 * @param {*} db Database pool connection.
 * @param {*} user_id A logged in user creating the listing.
 * @param {*} listing An object containing all of the listing details.
 * @returns {Promise<[{}]>} A promise to the listing.
 */

 const searchListings = function(db, user_id, listing) {
   const queryParams = [];
   let queryString =`SELECT * FROM listings `;
   const min_price = Number(listing.minimum_price);
   const max_price = Number(listing.maximum_price);

   if (listing.Title && listing.categories && listing.conditions && listing.minimum_price && listing.maximum_price) {
    queryParams.push(`%${listing.Title}%`);
    queryParams.push(`${listing.categories}`);
    queryParams.push(`${listing.conditions}`);
    queryParams.push(min_price);
    queryParams.push(max_price);
    queryString += `WHERE title LIKE $${queryParams.length - 4}
    AND category = $${queryParams.length - 3} AND condition = $${queryParams.length - 2}
    AND price BETWEEN $${queryParams.length - 1} AND $${queryParams.length}`;
   } else if (listing.Title && listing.categories && listing.minimum_price && listing.maximum_price) {
    queryParams.push(`%${listing.Title}%`);
    queryParams.push(`${listing.categories}`);
    queryParams.push(min_price);
    queryParams.push(max_price);
    queryString += `WHERE title LIKE $${queryParams.length - 3}
    AND category = $${queryParams.length - 2}
    AND price BETWEEN $${queryParams.length - 1} AND $${queryParams.length}`;
   } else if (listing.Title && listing.categories && listing.minimum_price) {
    queryParams.push(`%${listing.Title}%`);
    queryParams.push(`${listing.categories}`);
    queryParams.push(min_price);
    queryString += `WHERE title LIKE $${queryParams.length - 2}
    AND category = $${queryParams.length - 1}
    AND price >= $${queryParams.length}`;
   } else if (listing.Title && listing.categories && listing.maximum_price) {
    queryParams.push(`%${listing.Title}%`);
    queryParams.push(`${listing.categories}`);
    queryParams.push(max_price);
    queryString += `WHERE title LIKE $${queryParams.length - 2}
    AND category = $${queryParams.length - 1}
    AND price <= $${queryParams.length}`;
   } else if (listing.Title && listing.categories) {
    queryParams.push(`%${listing.Title}%`);
    queryParams.push(`${listing.categories}`);
    queryString += `WHERE title LIKE $${queryParams.length - 1}
    AND category = $${queryParams.length}`;
   }  else if (listing.conditions && listing.categories) {
    queryParams.push(`${listing.conditions}`);
    queryParams.push(`${listing.categories}`);
    queryString += `WHERE condition = $${queryParams.length - 1}
    AND category = $${queryParams.length}`;
   } else if (listing.minimum_price && listing.maximum_price) {
    queryParams.push(min_price);
    queryParams.push(max_price);
    queryString += `WHERE
    price BETWEEN $${queryParams.length - 1} AND $${queryParams.length}`;
   }else if (listing.Title) {
    queryParams.push(`%${listing.Title}%`);
    queryString += `WHERE title LIKE $${queryParams.length}`;
   } else if (listing.categories) {
    queryParams.push(`${listing.categories}`);
    queryString += `WHERE category = $${queryParams.length}`;
   } else if (listing.conditions) {
    queryParams.push(`${listing.conditions}`);
    queryString += `WHERE condition = $${queryParams.length}`;
   } else if (listing.minimum_price) {
    queryParams.push(min_price);
    queryString += `WHERE price >= $${queryParams.length}`;
   } else if (listing.maximum_price) {
    queryParams.push(max_price);
    queryString += `WHERE price <= $${queryParams.length}`;
   }
   console.log(queryString,queryParams);
  return db
    .query(queryString,queryParams)
    .then((result) => result.rows);
};

exports.searchListings = searchListings;
