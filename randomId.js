
const generateRandomNumberBetween = (requestParams, context, events, next) => {
  context.vars['restaurant_id'] = Math.floor((Math.random() * (1000000 - 900000 + 1)) + 900000);
  return next();
};

const setBody = (requestParams, context, events, next) => {
  requestParams.json = {   
    "newReview": {
      "user_id": Math.floor((Math.random() * (1000000 - 1 + 1)) + 1),
       "username": "JanAbernathy",
       "user_initials": "JA",
       "restaurant_id": Math.floor((Math.random() * (1000000 - 900000 + 1)) + 900000),
       "restaurant_name": "Miller  Douglas and Mertz",
       "review_text":
        "Minima sequi voluptatum. Delectus fuga est est doloremque maxime modi voluptatem. Iure dolore qui. Dolorem tempora eligendi reprehenderit quis cumque nemo. Ut porro recusandae nihil in aliquam. Reprehenderit nulla quia nihil sit dolor enim dolorum sint deserunt.",
       "overall_score": 4,
       "food_score": 0,
       "service_score": 5,
       "ambience_score": 5,
       "value_score": 2,
       "would_recommend": "false",
       "user_total_reviews": 10,
       "dined_on_date": "2018-12-02T00:00:00.000Z",
       "review_filters": "undefined"
    }
   };
  next();
};


module.exports = {
  generateRandomNumberBetween,
  setBody,
};
