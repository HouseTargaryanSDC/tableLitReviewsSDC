const faker = require('faker');

function generateRandomNumberBetween(beg, end) {
  return Math.floor((Math.random() * (end - beg + 1)) + beg);
}

// This will print 25 ids between a given range of ids
// ids generated within each quarter are random

let ids = [];

for (let i = 0; i < 25; i += 1) {
  const newId = (generateRandomNumberBetween(850001, 1000000));
  const newQuery = `          db.reviews_detail.explain("executionStats").aggregate({ $match: {restaurant_id: ${newId}}},{$group: {_id: "$restaurant_id",total_reviews: {$sum: 1},avg_overall: {$avg: "$overall_score"},avg_food: {$avg: "$food_score"},avg_service: {$avg: "$service_score"},avg_ambience: {$avg: "$ambience_score"},avg_value: {$avg: "$value_score"},total_recommend: {$sum: {$cond: [{ $eq: ["$would_recommend", "true"] }, 1, 0 ]}},}})          `;
  ids.push(newQuery);
}

console.log(ids);

