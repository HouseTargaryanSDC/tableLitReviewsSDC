// const mysql = require('mysql-promise');
// const db = mysql();
// db.configure(config);
const mongoose = require('mongoose');
const config = require('./config.js');

mongoose.connect('mongodb://localhost/tableit_reviews', {
  useNewUrlParser: true,
});

const reviewSchema = new mongoose.Schema({
  user_id: Number,
  username: String,
  user_initials: String,
  restaurant_id: Number,
  restaurant_name: String,
  review_text: String,
  overall_score: Number,
  food_score: Number,
  service_score: Number,
  ambience_score: Number,
  value_score: Number,
  would_recommend: Boolean,
  dined_on_date: Date,
  reviewFilter: String,
});

const userSchema = new mongoose.Schema({
  user_id: Number,
  user_total_reviews: Number,
});

const Review = mongoose.model('Review', reviewSchema, 'reviews_detail');
const User = mongoose.model('User', userSchema, 'users');

module.exports = {
  Review,
  User,
};
