const db = require('./index.js');


module.exports = {
  // getAllReviews: restaurantId => db.query(`
  //   SELECT
  //     rd.*,
  //     u.username,
  //     u.user_initials,
  //     u.user_city,
  //     a.user_total_reviews
  //   FROM reviews_detail rd
  //   JOIN users u
  //     ON rd.user_id = u.id
  //   JOIN (
  //     SELECT
  //       user_id,
  //       count(*) user_total_reviews
  //     FROM reviews_detail
  //     GROUP BY user_id) a
  //     ON rd.user_id = a.user_id
  //   WHERE restaurant_id = ${restaurantId};    
  // `),
  getAllReviews: restaurantId => db.query(`
    SELECT
    rd.*,
    u.username,
    u.user_initials,
    u.user_city,
    u.user_total_reviews
    FROM reviews_detail rd
    JOIN users u
    ON rd.user_id = u.id
    WHERE restaurant_id = ${restaurantId};
  `),
  getReviewsSummary: restaurantId => db.query(`SELECT restaurant_id, COUNT(*) total_reviews,
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
    WHERE restaurant_id = ${restaurantId}
    GROUP BY 1`),
};

