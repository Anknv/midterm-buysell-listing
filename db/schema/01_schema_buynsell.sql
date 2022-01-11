-- Drop and recreate tables for buynsell app

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS listings CASCADE;
DROP TABLE IF EXISTS listing_likes CASCADE;

-- users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- listings table
CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  price INTEGER  NOT NULL DEFAULT 0,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  condition VARCHAR(255),
  description TEXT,
  image_url VARCHAR(255) NOT NULL,
  is_sold BOOLEAN NOT NULL DEFAULT FALSE,
  created_on TIMESTAMP
);

-- listing_likes table
CREATE TABLE listing_likes (
id SERIAL PRIMARY KEY NOT NULL,
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE
);
