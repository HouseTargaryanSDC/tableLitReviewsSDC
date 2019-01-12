const dbHelpers = require('../db/dbHelpers.js');

module.exports = {
  all: {
    get: (req, res) => {
      const { restaurantId } = req.params;
      dbHelpers.getAllReviews(restaurantId)
        .spread((data) => { res.status(200).send(data); })
        .catch((err) => { console.error(err); });
    },
    post: (req, res) => {
      const { newReview } = req.body;
      dbHelpers.addReview(newReview)
        .spread(() => { res.status(200).send(); })
        .catch((err) => { console.error(err); });
    },
  },
  summary: {
    get: (req, res) => {
      const { restaurantId } = req.params;
      dbHelpers.getReviewsSummary(restaurantId)
        .spread((data) => {
          const {
            restaurant_id,
            total_reviews,
            avg_overall,
            avg_food,
            avg_service,
            avg_ambience,
            avg_value,
            pct_recommend,
            review_filter_1,
            review_filter_2,
            review_filter_3,
            review_filter_4,
            review_filter_5,
          } = data[0];
          const reviewsSummary = {
            restaurant_id,
            total_reviews,
            avg_overall,
            avg_food,
            avg_service,
            avg_ambience,
            avg_value,
            pct_recommend,
            review_filter_1,
            review_filter_2,
            review_filter_3,
            review_filter_4,
            review_filter_5,
            loved_for_1: 'Sauces',
            loved_for_2: 'Wine',
            noise_level: 'Moderate',
            reviewsFilters: [
              data[0].review_filter_1,
              data[0].review_filter_2,
              data[0].review_filter_3,
              data[0].review_filter_4,
              data[0].review_filter_5,
            ],
          };
          for (let i = 1; i <= 5; i += 1) { delete reviewsSummary[`review_filter_${i}`]; }
          res.status(200).send(reviewsSummary);
        })
        .catch((err) => { console.error(err); });
    },
  },
};
