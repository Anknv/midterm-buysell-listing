/**
 * Add a listing to the database.
 * @param {*} db Database pool connection.
 * @param {*} user_id A logged in user creating the listing.
 * @param {*} listing An object containing all of the listing details.
 * @returns {Promise<[{}]>} A promise to the listing.
 */

const createNewListing = function(db, user_id, listing) {
  return db
    .query(`INSERT INTO listings (user_id, price, title, category, condition, description, image_url, is_sold, created_on)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`,
    [user_id, listing.price, listing.title, listing.category, listing.condition, listing.description, listing.image_url, false, 'NOW()'])
    .then((result) => result.rows[0]);
};

exports.createNewListing = createNewListing;
