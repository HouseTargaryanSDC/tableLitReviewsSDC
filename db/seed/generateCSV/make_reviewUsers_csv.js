const faker = require('faker');
const path = require('path');
const fs = require('fs');
const { performance, PerformanceObserver } = require('perf_hooks');

const file = fs.createWriteStream(path.join(__dirname, '../seedCSV/reviewUsers_table.csv'));


function randomBooleanValue(num) {
  return num % 2 === 0;
}

function generateRandomNumberBetween(beg, end) {
  return Math.floor((Math.random() * (end - beg + 1)) + beg);
}


// Use the code below to generate a csv file that contains n records
// formatted for the db schema

let id = 0;
const start = Date.now();


// make 10 million records
// change i in writeOneMillionTimes to equal the number of records you want in th csv file

function writeOneMillionTimes(writer, encoding, callback) {
  let i = 10000000;
  let restaurant_id = generateRandomNumberBetween(1, 1000000);

  write();
  function write() {
    let ok = true;
    do {
      const user_id = generateRandomNumberBetween(1, 1000000);
      let toWrite = `${id},${user_id},${restaurant_id}` + '\n';

      id += 1;
      i -= 1;

      if (i % 10 === 0) {
        restaurant_id = generateRandomNumberBetween(1, 1000000);
      }
      if (i === 9999999) {
        toWrite = 'id,user_id,restaurant_id \n';
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
