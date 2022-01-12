const markAsSoldListing = function(db, listingId) {
  const queryParams = [listingId];
  let queryString = `
  UPDATE listings
  SET is_sold = true
  WHERE listings.id = $1
  `;

  return db.query(queryString, queryParams).then((res) => res.rows);
}

exports.markAsSoldListing = markAsSoldListing;
