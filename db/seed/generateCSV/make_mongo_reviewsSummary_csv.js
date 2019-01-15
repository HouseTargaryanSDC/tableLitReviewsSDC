const faker = require('faker');
const path = require('path');
const fs = require('fs');

const file = fs.createWriteStream(path.join(__dirname, '../seedCSV/mongoDB.csv'));

const start = Date.now();

function randomBooleanValue(num) {
  return num % 2 === 0;
}

function generateRandomNumberBetween(beg, end) {
  return Math.floor((Math.random() * (end - beg + 1)) + beg);
}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}


// let id = 80000000;


// make 10 million records
// change i in writeOneMillionTimes to equal the number of records you want in th csv file

function writeOneMillionTimes(writer, encoding, callback) {
  let i = 10;
  let user_id = 1;
  let first = faker.name.firstName();
  let last = faker.name.lastName();
  let username = first + last;
  let user_initials = first[0] + last[0];
  write();
  function write() {
    let ok = true;
    do {
      const restaurant_id = generateRandomNumberBetween(850000, 1000000);
      const restaurant_name = faker.company.companyName().split(',').join(' ');
      const review_text = faker.lorem.sentences(6);
      const overall_score = generateRandomNumberBetween(0, 5);
      const food_score = generateRandomNumberBetween(0, 5);
      const service_score = generateRandomNumberBetween(0, 5);
      const ambience_score = generateRandomNumberBetween(0, 5);
      const value_score = generateRandomNumberBetween(0, 5);
      const would_recommend = randomBooleanValue(generateRandomNumberBetween(0, 1));
      const dined_on_date = formatDate(faker.date.between('11/1/2018', '1/31/19'));
      const reviewFilter = 'Burgers Burritos Pizzas Tacos Sandwiches';

      // id += 1;
      i -= 1;
      if (i % 10 === 0) {
        user_id += 1;
        first = faker.name.firstName();
        last = faker.name.lastName();
        username = first + last;
        user_initials = first[0] + last[0];

      }
      // removed id from the toWrite line below

      let toWrite = `${user_id},${username},${user_initials},${restaurant_id},${restaurant_name},${review_text},${overall_score},${food_score},${service_score},${ambience_score},${value_score},${would_recommend},${dined_on_date},${reviewFilter}` + '\n';

      // if (i === 99) {
      //   toWrite = 'id,user_id,restaurant_id,review_text,overall_score,food_score,ambience_score,value_score,would_recommend,dined_on_date\n';
      // }
      if (i === 0) {
        // last time!
        writer.write(toWrite, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(toWrite, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
}


writeOneMillionTimes(file, 'utf-8', () => {
  file.end();
  const stop = Date.now() - start;
  console.log('Runtime: ', stop);
});


// db.reviews_detail.aggregate([{$match: { restaurant_id: 988682 }},{ $group: avg_overall: { $avg: "$overall_score"}], avg_food: { $avg: "$food_score"}, avg_service: { $avg: "$service_score"}, avg_ambience: { $avg: "$ambience_score"}, avg_value: { $avg: "$value_score"}, pct_recommend: { $divide: [{ $sum: "$would_recommend"},{ $count: "_id"}]}, review_filter_1: "Burgers", review_filter_2: "Burritos", review_filter_3: "Pizzas", review_filter_4: "Tacos", review_filter_5: "Sandwiches", loved_for_1: "Sauces", loved_for_2: "Wine", noise_level: "Moderate" }}]);