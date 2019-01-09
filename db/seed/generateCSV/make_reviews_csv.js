const faker = require('faker');
const path = require('path');
const fs = require('fs');

const file = fs.createWriteStream(path.join(__dirname, '../seedCSV/reviews_table.csv'));

const start = Date.now();

function randomBooleanValue(num) {
  return num % 2 === 0;
}

function generateRandomNumberBetween(beg, end) {
  return Math.floor((Math.random() * (end - beg + 1)) + beg);
}


let id = -1;

// make 10 million records

function writeOneMillionTimes(writer, encoding, callback) {
  let i = 10000000;
  write();
  function write() {
    let ok = true;
    do {
      const user_id = generateRandomNumberBetween(1, 1000000);
      const restaurant_id = generateRandomNumberBetween(1, 10000000);
      const review_text = faker.lorem.sentences(6);
      const overall_score = generateRandomNumberBetween(0, 5);
      const food_score = generateRandomNumberBetween(0, 5);
      const ambience_score = generateRandomNumberBetween(0, 5);
      const value_score = generateRandomNumberBetween(0, 5);
      const would_recommend = randomBooleanValue(generateRandomNumberBetween(1, 100));
      const dined_on_date = faker.date.between('11/1/2018', '1/31/2019');

      id += 1;
      i -= 1;

      let toWrite = `${id},${user_id},${restaurant_id},${review_text},${overall_score},${food_score},${ambience_score},${value_score},${would_recommend},${dined_on_date}` + '\n';

      if (i === 9999999) {
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
