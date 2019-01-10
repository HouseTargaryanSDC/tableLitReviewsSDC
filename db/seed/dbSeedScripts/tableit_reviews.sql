/* takes about 7 mins to finish seeding */

DROP DATABASE tableit_reviews;

CREATE DATABASE tableit_reviews;

USE tableit_reviews;

-- /* Make the RESTAURANTS table */

CREATE TABLE restaurants (
  id INT AUTO_INCREMENT,
  restaurant_name VARCHAR(255),
  PRIMARY KEY(id)
);

LOAD DATA LOCAL INFILE '../seedCSV/restaurants_table.csv' INTO TABLE restaurants FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;

CREATE TABLE users (
  id INT AUTO_INCREMENT,
  user_name VARCHAR(255),
  user_initials VARCHAR(2),
  user_city VARCHAR(255),
  PRIMARY KEY(id)
);

LOAD DATA LOCAL INFILE '../seedCSV/users_table.csv' INTO TABLE users FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;

CREATE TABLE reviews_detail (
  id INT AUTO_INCREMENT,
  restaurant_id INT,
  user_id INT,
  review_text TEXT,
  overall_score INT,
  food_score INT,
  service_score INT,
  ambience_score INT,
  value_score INT,
  would_recommend BOOLEAN,
  dined_on_date DATE,
  PRIMARY KEY(id)
);

LOAD DATA LOCAL INFILE '../seedCSV/reviewsDetail_table.csv' INTO TABLE reviews_detail FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;

CREATE TABLE reviewUsers (
  id INT AUTO_INCREMENT,
  restaurant_id INT,
  user_id INT,
  PRIMARY KEY(id)
);

LOAD DATA LOCAL INFILE '../seedCSV/reviewUsers_table.csv' INTO TABLE reviewUsers FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;

CREATE TABLE review_filters (
  id INT AUTO_INCREMENT,
  restaurant_id INT,
  review_filter VARCHAR(55),
  PRIMARY KEY(id)
);

LOAD DATA LOCAL INFILE '../seedCSV/reviewsFilters_table.csv' INTO TABLE review_filters FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;


CREATE VIEW reviews_summary AS 
SELECT
  restaurant_id,
  COUNT(*) total_reviews,
  CAST(AVG(overall_score) AS DECIMAL(2,1)) avg_overall,
  CAST(AVG(food_score) AS DECIMAL(2,1)) avg_food,
  CAST(AVG(service_score) AS DECIMAL(2,1)) avg_service,
  CAST(AVG(ambience_score) AS DECIMAL(2,1)) avg_ambience,
  CAST(AVG(value_score) AS DECIMAL(2,1)) avg_value,
  SUM(would_recommend) / COUNT(*) pct_recommend,
  "Burgers" review_filter_1,
  "Burritos" review_filter_2,
  "Pizzas" review_filter_3,
  "Tacos" review_filter_4,
  "Sandwiches" review_filter_5,
  'Sauces' loved_for_1,
  'Wine' loved_for_2,
  'Moderate' noise_level
FROM reviews_detail
GROUP BY 1;

