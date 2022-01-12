const deleteListing = function(db, user_id, listingId) {
  const queryParams = [listingId, user_id];
  let queryString = `
  DELETE FROM listings
  WHERE listings.id = $1 AND listings.user_id = $2
  RETURNING id, is_sold;
  `;

  return db.query(queryString, queryParams).then((res) => res.rows[0]);
}

exports.deleteListing = deleteListing;
