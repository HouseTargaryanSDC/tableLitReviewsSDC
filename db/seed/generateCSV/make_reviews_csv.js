const faker = require('faker');
const path = require('path');
const fs = require('fs');

const file = fs.createWriteStream(path.join(__dirname, '../seedCSV/reviews_table.csv'));


function randomBooleanValue(num) {
  return num % 2 === 0;
}

function generateRandomNumberBetween(beg, end) {
  return Math.floor((Math.random() * (end - beg + 1)) + beg);
}


let id = 1;

// make 10 million records

const numberOfRecords = 10; // 10000000;

for (let i = 0; i <= numberOfRecords; i += 1) {
  if (i === 0) {
    file.write('id,user_id,restaurant_id,review_text,overall_score,food_score,ambience_score,value_score,would_recommend,dined_on_date\n', (err) => {
      if (err) {
        console.log('error writing to file', err);
      } else {
        console.log('success writing headers in csv');
      }
    });
  } else {
    const user_id = generateRandomNumberBetween(1, 1000000);
    const restaurant_id = generateRandomNumberBetween(1, 10000000);
    const review_text = faker.lorem.sentences(6);
    const overall_score = generateRandomNumberBetween(0, 5);
    const food_score = generateRandomNumberBetween(0, 5);
    const ambience_score = generateRandomNumberBetween(0, 5);
    const value_score = generateRandomNumberBetween(0, 5);
    const would_recommend = randomBooleanValue(generateRandomNumberBetween(1, 100));
    const dined_on_date = faker.date.between('11/1/2018', '1/31/2019');

    const toWrite = `${id},${user_id},${restaurant_id},${review_text},${overall_score},${food_score},${ambience_score},${value_score},${would_recommend},${dined_on_date}` + '\n';
    file.write(toWrite, (err) => {
      if (err) {
        console.log('error writing to file -->', err);
      } else {
        // console.log('id: ', id);
      }
    });
    id += 1;
  }
}
file.end();
