/**
 * Get all listings.
 * @param {*} db Database pool connection.
 * @param {Object} options An object containing query options.
 * @param {string} options.user_id Only show listings for this user id.
 * @param {string} options.word Filter listings by word.
 * @param {string} options.condition Filter listings by condition.
 * @param {string} options.category Filter listings by category.
 * @param {number} options.minimum_price Only show listings >= min price.
 * @param {number} options.maximum_price Only show listings <= max price.
 * @param {string} options.order_by Either 'most_liked' or defaults to most recent listings
 * @param {number} limit The number of listings to return.
 * @return {Promise<[{}]>}  A promise to the listing.
 */

const getAllListings = function(db, options, limit = 100) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT listings.*, count(listing_likes.id) as trending_rating
  FROM listings
  LEFT JOIN listing_likes ON listings.id = listing_id
  `;

  // 3
  const whereConditions = [];
  if (!options.show_sold) {
    whereConditions.push(`is_sold = false`);
  }

  if (options.user_id) {
    queryParams.push(options.user_id);
    whereConditions.push(`listings.user_id = $${queryParams.length}`);
  }

  if (options.word) {
    queryParams.push(`%${options.word}%`);
    whereConditions.push(`(title LIKE $${queryParams.length} OR description LIKE $${queryParams.length})`);
  }

  if (options.condition) {
    queryParams.push(options.condition);
    whereConditions.push(`condition = $${queryParams.length}`);
  }

  if (options.category) {
    queryParams.push(options.category);
    whereConditions.push(`category = $${queryParams.length}`);
  }

  if (options.minimum_price) {
    queryParams.push(options.minimum_price * 100);
    whereConditions.push(`price >= $${queryParams.length}`);
  }

  if (options.maximum_price) {
    queryParams.push(options.maximum_price * 100);
    whereConditions.push(`price <= $${queryParams.length}`);
  }

  if (options.featured) {
    whereConditions.push(`featured = True`);
  }

  let orderBy = 'created_on DESC';
  if (options.order_by) {
    if (options.order_by === 'most_liked') {
      orderBy = 'trending_rating DESC';
    }
  }

  const whereString = whereConditions.length ? `WHERE ${whereConditions.join(' AND ')}` : '';

  queryString += whereString;

  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY listings.id
  ORDER BY ${orderBy}
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return db.query(queryString, queryParams).then((res) => res.rows);
};

// TESTS
// getAllListings({}, { maximum_price: 10000 }, 10)
// getAllListings({}, { minimum_price: 100 }, 10)
// getAllListings({}, { maximum_price: 10000, minimum_price: 100 }, 10)
// getAllListings({}, { word: 'shoe' }, 10)
// getAllListings({}, { word: 'shoe', order_by: 'most_liked' }, 10)
// getAllListings({}, { condition: 'used', category: 'shoes' })

exports.getAllListings = getAllListings;
