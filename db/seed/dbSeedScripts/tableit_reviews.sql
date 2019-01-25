/* takes about 40 mins to finish seeding */

-- DROP DATABASE tableit_reviews;

-- CREATE DATABASE tableit_reviews;

USE tableit_reviews;

SET GLOBAL local_infile = 'ON';
-- SET GLOBAL innodb_file_per_table=1;
-- SET GLOBAL innodb_file_format=Barracuda;

set AUTOCOMMIT = 0;
SET UNIQUE_CHECKS = 0;
SET FOREIGN_KEY_CHECKS = 0;

-- CREATE TABLE restaurants (
--   id BIGINT AUTO_INCREMENT,
--   restaurant_name VARCHAR(255),
--   PRIMARY KEY(id)
-- );

-- CREATE TABLE users (
--   id BIGINT AUTO_INCREMENT,
--   username VARCHAR(255),
--   user_initials VARCHAR(2),
--   user_city VARCHAR(255),
--   user_total_reviews INT,
--   PRIMARY KEY(id)
-- );

-- CREATE TABLE reviews_detail (
--   id BIGINT AUTO_INCREMENT,
--   restaurant_id BIGINT,
--   user_id BIGINT,
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

-- CREATE TABLE review_filters (
--   id BIGINT AUTO_INCREMENT,
--   restaurant_id BIGINT,
--   review_filter VARCHAR(55),
--   PRIMARY KEY(id),
--   FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
-- );

-- LOCK TABLE restaurants WRITE;

LOCK TABLES restaurants WRITE, users WRITE, reviews_detail WRITE, review_filters WRITE;

LOAD DATA LOCAL INFILE '../seedCSV/restaurants_table.csv' IGNORE INTO TABLE restaurants FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;

LOAD DATA LOCAL INFILE '../seedCSV/users_table.csv' IGNORE INTO TABLE users FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;


LOAD DATA LOCAL INFILE '../seedCSV/reviewsDetail90_table.csv' IGNORE INTO TABLE reviews_detail FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;

LOAD DATA LOCAL INFILE '../seedCSV/reviewsDetail10_table.csv' IGNORE INTO TABLE reviews_detail FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n';

LOAD DATA LOCAL INFILE '../seedCSV/reviewsFilters_table.csv' IGNORE INTO TABLE review_filters FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;


UNLOCK TABLES;

SET UNIQUE_CHECKS = 1;
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;

-- DELIMITER //

-- CREATE PROCEDURE CLEARUSERTOTALS()
-- BEGIN
-- DECLARE n INT DEFAULT 0;
-- DECLARE i INT DEFAULT 0;
-- -- SELECT COUNT(*) FROM users INTO n;
-- SET i=1;
-- SET n=10;
-- WHILE i<=n DO
-- UPDATE users u 
-- SET u.user_total_reviews = 0
-- WHERE u.id = i;
-- SET i = i + 1;
-- END WHILE;
-- END;
-- //

-- DELIMITER ;




-- DELIMITER //

-- CREATE PROCEDURE COUNTUSERTOTALS()
-- BEGIN
-- DECLARE n INT DEFAULT 0;
-- DECLARE i INT DEFAULT 0;
-- SELECT COUNT(*) FROM users INTO n;
-- SET i=1;
-- WHILE i<=n DO
-- UPDATE users u 
-- SET u.user_total_reviews = (SELECT us.user_total_reviews FROM users us WHERE us.user_id = i) + 1
-- WHERE u.id = i;
-- SET i = i + 1;
-- END WHILE;
-- END;
-- //

-- DELIMITER ;

-- CALL USERTOTALS();

-- UNCOMMENT TO HAVE EVENT RUNNING

-- CREATE EVENT update_totals
-- ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 3 HOUR
-- DO
-- CALL USERTOTALS();

SET GLOBAL local_infile = 'OFF';
