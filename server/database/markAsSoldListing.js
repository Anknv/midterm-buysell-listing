const markAsSoldListing = function(db, user_id, listingId) {
  const queryParams = [listingId, user_id];
  let queryString = `
  UPDATE listings
  SET is_sold = true
  WHERE listings.id = $1 AND listings.user_id = $2
  `;

  return db.query(queryString, queryParams).then((res) => res.rows);
}

exports.markAsSoldListing = markAsSoldListing;
