const faker = require('faker');
const path = require('path');
const fs = require('fs');

const file = fs.createWriteStream(path.join(__dirname, '../seedCSV/reviewsDetail90_table.csv'));

// Use the code below to generate a csv file that contains n records
// formatted for the db schema

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


let id = -1;

// make 10 million records
// change i in writeOneMillionTimes to equal the number of records you want in th csv file

function writeOneMillionTimes(writer, encoding, callback) {
  let i = 8000001;

  write();
  function write() {
    let ok = true;
    do {
      const user_id = generateRandomNumberBetween(1, 1000000);
      const restaurant_id = generateRandomNumberBetween(1, 900000);
      const review_text = faker.lorem.sentences(6);
      const overall_score = generateRandomNumberBetween(0, 5);
      const food_score = generateRandomNumberBetween(0, 5);
      const service_score = generateRandomNumberBetween(0, 5);
      const ambience_score = generateRandomNumberBetween(0, 5);
      const value_score = generateRandomNumberBetween(0, 5);
      const would_recommend = generateRandomNumberBetween(0, 1);
      const dined_on_date = formatDate(faker.date.between('11/1/2018', '1/31/2019'));

      id += 1;
      i -= 1;

      let toWrite = `${id},${user_id},${restaurant_id},${review_text},${overall_score},${food_score},${service_score},${ambience_score},${value_score},${would_recommend},${dined_on_date}` + '\n';

      if (i === 8000000) {
        toWrite = 'id,user_id,restaurant_id,review_text,overall_score,food_score,ambience_score,value_score,would_recommend,dined_on_date\n';
      }
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
