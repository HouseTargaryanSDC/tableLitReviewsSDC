const { Review, User } = require('./index.js');

module.exports = {
  getAllReviews: (restaurantId) => {
    console.log('here!')
    return Review.aggregate([
      {
        $lookup:
        {
          from: 'users',
          localField: 'user_id',
          foreignField: 'user_id',
          as: 'user_data'
        }
      },
      {
        $match: {restaurant_id: Number(restaurantId) }
      },
      {
        $unwind: '$user_data'
      },
      {
        $project: {
          _id: 0,
          'user_data._id': 0
        }
      }
    ]);
  },
  getReviewsSummary: (rest_id) => {
    return Review.aggregate([
      {
        $match: {
          restaurant_id: Number(rest_id),
        },
      },
      {
        $group: {
          _id: '$restaurant_id',
          total_reviews: {
            $sum: 1,
          },
          avg_overall: {
            $avg: '$overall_score',
          },
          avg_food: {
            $avg: '$food_score',
          },
          avg_service: {
            $avg: '$service_score',
          },
          avg_ambience: {
            $avg: '$ambience_score',
          },
          avg_value: {
            $avg: '$value_score',
          },
          total_recommend: {
            $sum: {
              $cond: [{ $eq: ['$would_recommend', 'true'] }, 1, 0],
            },
          },
        },
      },
    ]);
  },
  addReview: (newReview, cb) => {
    console.log('user -->', newReview.user_id);
    User.find({ user_id: newReview.user_id })
      .then((data) => {
        const total = data[0].user_total_reviews + 1;
        console.log('user total -->', data);
        User.update({ user_id: newReview.user_id }, { user_total_reviews: total })
          .then(() => {
            Review.create(newReview)
              .then(() => {
                cb();
              })
              .catch((err) => { console.log(err); });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => { console.log(err); });
  },
};


// The below is the code for MySql

// module.exports = {
//   // getAllReviews: restaurantId => db.query(`
//   //   SELECT
//   //     rd.*,
//   //     u.username,
//   //     u.user_initials,
//   //     u.user_city,
//   //     a.user_total_reviews
//   //   FROM reviews_detail rd
//   //   JOIN users u
//   //     ON rd.user_id = u.id
//   //   JOIN (
//   //     SELECT
//   //       user_id,
//   //       count(*) user_total_reviews
//   //     FROM reviews_detail
//   //     GROUP BY user_id) a
//   //     ON rd.user_id = a.user_id
//   //   WHERE restaurant_id = ${restaurantId};    
//   // `),
//   getAllReviews: restaurantId => db.query(`
//     SELECT
//     rd.*,
//     u.username,
//     u.user_initials,
//     u.user_city,
//     u.user_total_reviews
//     FROM reviews_detail rd
//     JOIN users u
//     ON rd.user_id = u.id
//     WHERE restaurant_id = ${restaurantId};
//   `),
//   getReviewsSummary: restaurantId => db.query(`SELECT restaurant_id, COUNT(*) total_reviews,
//     CAST(AVG(overall_score) AS DECIMAL(2,1)) avg_overall,
//     CAST(AVG(food_score) AS DECIMAL(2,1)) avg_food,
//     CAST(AVG(service_score) AS DECIMAL(2,1)) avg_service,
//     CAST(AVG(ambience_score) AS DECIMAL(2,1)) avg_ambience,
//     CAST(AVG(value_score) AS DECIMAL(2,1)) avg_value,
//     SUM(would_recommend) / COUNT(*) pct_recommend,
//     "Burgers" review_filter_1,
//     "Burritos" review_filter_2,
//     "Pizzas" review_filter_3,
//     "Tacos" review_filter_4,
//     "Sandwiches" review_filter_5,
//     'Sauces' loved_for_1,
//     'Wine' loved_for_2,
//     'Moderate' noise_level
//     FROM reviews_detail
//     WHERE restaurant_id = ${restaurantId}
//     GROUP BY 1`),
// };

const getUserIds = (arr) => {
  const ids = [];
  for (let i = 0; i < arr.length; i += 1) {
    ids.push({ user_id: arr[i].user_id });
  }
  return ids;
};


    // Review.find({ restaurant_id })
    //   .then((data) => {
        // const userIds = getUserIds(data);
        // User.aggregate([{
        //   $match: {
        //     $or: userIds,
        //   },
        // }], (err, results) => {
        //   if (err) {
        //     console.log(err);
        //   } else {
        //     cb(data, results);
        //   }
        // });
    //   })
    //   .catch(err => console.log('error getting from Review -->', err));