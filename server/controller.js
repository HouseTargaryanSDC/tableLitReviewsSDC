const dbHelpers = require('../db/dbHelpers.js');

module.exports = {
  all: {
    get: (req, res) => {
      const { restaurantId } = req.params;
      dbHelpers.getAllReviews(restaurantId)
        .then((data) => {
          // const { user_total_reviews } = data.user_data;
          res.status(200).send(data);
        })
        .catch((err) => {
          console.log(err);
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
      dbHelpers.getReviewsSummary(restaurant_id)
        .then((data) => {
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
            avg_overall: avg_overall.toFixed(1),
            avg_food: avg_food.toFixed(1),
            avg_service: avg_service.toFixed(1),
            avg_ambience: avg_ambience.toFixed(1),
            avg_value: avg_value.toFixed(1),
            pct_recommend: ((total_recommend / total_reviews) * 100).toFixed(2),
            reviewsFilters: 'Burgers Burritos Pizzas Tacos Sandwiches'.split(' '),
            // review_filter_1: 'Burgers',
            // review_filter_2: 'Burritos',
            // review_filter_3: 'Pizzas',
            // review_filter_4: 'Tacos',
            // review_filter_5: 'Sandwiches',
            loved_for_1: 'Sauces',
            loved_for_2: 'Wine',
            noise_level: 'Moderate',
          };
          // for (let i = 1; i <= 5; i += 1) { delete reviewsSummary[`review_filter_${i}`]; }
          res.status(200).send(reviewsSummary);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};

// const extendWithTotals = (ids, arr) => {
//   console.log('ids ', ids);
//   const holder = [];
//   for (let i = 0; i < arr.length; i += 1) {
//     const { user_total_reviews } = ids[i];
//     const { _id,
//       user_id,
//       username,
//       user_initials,
//       restaurant_id,
//       restaurant_name,
//       review_text,
//       overall_score,
//       food_score,
//       service_score,
//       ambience_score,
//       value_score,
//       would_recommend,
//       dined_on_date,
//       review_filters, 
//     } = arr[i];
//     const newObj = {
//       _id,
//       user_id,
//       username,
//       user_initials,
//       restaurant_
//       restaurant_name,
//       review_text,
//       overall_score,
//       food_score,
//       service_score,
//       ambience_score,
//       value_score,
//       would_recommend,
//       user_total_reviews,
//       dined_on_date,
//       review_filters, 
//     };
//     holder.push(newObj);
//   }
//   return holder;
// };

    // get: (req, res) => {
      // const { restaurantId } = req.params;
    //   dbHelpers.getAllReviews(restaurantId, (data, results) => {
    //     let hot = extendWithTotals(results, data);
    //     res.status(200).send(hot);
    //   });
    // },