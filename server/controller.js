const dbHelpers = require('../db/dbHelpers.js');

module.exports = {
  all: {
    get: (req, res) => {
      const { restaurantId } = req.params;
      dbHelpers.getAllReviews(restaurantId, (data, results) => {
        let hot = extendWithTotals(results, data);
        res.status(200).send(hot);
      });
    },
    post: (req, res) => {
      const { newReview } = req.body;
      dbHelpers.addReview(newReview, () => {
        res.status(201).send('review posted!');
      });
    },
  },
  summary: {
    get: (req, res) => {
      const { restaurantId } = req.params;
      const restaurant_id = restaurantId;
      dbHelpers.getReviewsSummary(restaurant_id, (data) => {
        console.log('this is summary data -->', data);
        const {
          _id,
          total_reviews,
          avg_overall,
          avg_food,
          avg_service,
          avg_ambience,
          avg_value,
          total_recommend,
        } = data[0];
        const reviewsSummary = {
          restaurant_id: _id,
          total_reviews,
          avg_overall,
          avg_food,
          avg_service,
          avg_ambience,
          avg_value,
          pct_recommend: ((total_recommend / total_reviews) * 100).toFixed(2),
          reviewFilter: 'Burgers Burritos Pizzas Tacos Sandwiches',
          loved_for_1: 'Sauces',
          loved_for_2: 'Wine',
          noise_level: 'Moderate',
        };
        // for (let i = 1; i <= 5; i += 1) { delete reviewsSummary[`review_filter_${i}`]; }
        res.status(200).send(reviewsSummary);
      });
    },
  },
};

const extendWithTotals = (ids, arr) => {
  console.log('ids ', ids);
  const holder = [];
  for (let i = 0; i < arr.length; i += 1) {
    const { user_total_reviews } = ids[i];
    const { _id,
      user_id,
      username,
      user_initials,
      restaurant_id,
      restaurant_name,
      review_text,
      overall_score,
      food_score,
      service_score,
      ambience_score,
      value_score,
      would_recommend,
      dined_on_date,
      review_filters, 
    } = arr[i];
    const newObj = {
      _id,
      user_id,
      username,
      user_initials,
      restaurant_id,
      restaurant_name,
      review_text,
      overall_score,
      food_score,
      service_score,
      ambience_score,
      value_score,
      would_recommend,
      user_total_reviews,
      dined_on_date,
      review_filters, 
    };
    holder.push(newObj);
  }
  console.log('holder -->', holder);
  return holder;
};