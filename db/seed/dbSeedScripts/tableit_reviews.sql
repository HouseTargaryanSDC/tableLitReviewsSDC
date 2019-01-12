/* takes about 40 mins to finish seeding */

DROP DATABASE tableit_reviews;

CREATE DATABASE tableit_reviews;

USE tableit_reviews;

SET GLOBAL local_infile = 'ON';

SET UNIQUE_CHECKS = 0;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE restaurants (
  id INT AUTO_INCREMENT,
  restaurant_name VARCHAR(255),
  PRIMARY KEY(id)
);

LOAD DATA LOCAL INFILE '../seedCSV/restaurants_table.csv' INTO TABLE restaurants FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;


CREATE TABLE users (
  id INT AUTO_INCREMENT,
  username VARCHAR(255),
  user_initials VARCHAR(2),
  user_city VARCHAR(255),
  user_total_reviews INT,
  PRIMARY KEY(id)
);

LOAD DATA LOCAL INFILE '../seedCSV/users_table.csv' INTO TABLE users FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;

-- CREATE TABLE reviews_detail (
--   id INT AUTO_INCREMENT,
--   restaurant_id INT,
--   user_id INT,
--   review_text TEXT,
--   overall_score INT,
--   food_score INT,
--   service_score INT,
--   ambience_score INT,
--   value_score INT,
--   would_recommend TINYINT(1),
--   dined_on_date DATE,
--   PRIMARY KEY(id),
--   FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
--   FOREIGN KEY (user_id) REFERENCES users(id)
-- );

-- LOAD DATA LOCAL INFILE '../seedCSV/reviewsDetail90_table.csv' INTO TABLE reviews_detail FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;

-- LOAD DATA LOCAL INFILE '../seedCSV/reviewsDetail10_table.csv' INTO TABLE reviews_detail FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;

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
  PRIMARY KEY(id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

LOAD DATA LOCAL INFILE '../seedCSV/reviewsFilters_table.csv' INTO TABLE review_filters FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;

SET UNIQUE_CHECKS = 1;
SET FOREIGN_KEY_CHECKS = 1;


DELIMITER //

CREATE PROCEDURE USERTOTALS()
BEGIN
DECLARE n INT DEFAULT 0;
DECLARE i INT DEFAULT 0;
SELECT COUNT(*) FROM users INTO n;
SET i=1;
WHILE i<=n DO
UPDATE users u 
SET u.user_total_reviews = (SELECT COUNT(*) FROM reviews_detail rd WHERE rd.user_id = i)
WHERE u.id = i;
SET i = i + 1;
END WHILE;
END;
//

DELIMITER ;

-- CALL USERTOTALS();

-- UNCOMMENT TO HAVE EVENT RUNNING

-- CREATE EVENT update_totals
-- ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 3 HOUR
-- DO
-- CALL USERTOTALS();

SET GLOBAL local_infile = 'OFF';
