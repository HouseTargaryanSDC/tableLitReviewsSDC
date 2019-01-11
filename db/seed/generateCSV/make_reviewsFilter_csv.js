const path = require('path');
const fs = require('fs');

const file = fs.createWriteStream(path.join(__dirname, '../seedCSV/reviewsFilters_table.csv'));


// Use the code below to generate a csv file that contains n records
// formatted for the db schema

const start = Date.now();

function randomBooleanValue(num) {
  return num % 2 === 0;
}

function generateRandomNumberBetween(beg, end) {
  return Math.floor((Math.random() * (end - beg + 1)) + beg);
}


let id = -1;
const filters = 'Burgers Burritos Pizzas Tacos Sandwiches';

// make 1 million records
// change i in writeOneMillionTimes to equal the number of records you want in th csv file

function writeOneMillionTimes(writer, encoding, callback) {
  let i = 1000001;
  write();
  function write() {
    let ok = true;
    do {

      const review_filter = filters;
      id += 1;
      i -= 1;

      let toWrite = `${id},${id},${review_filter}` + '\n';

      if (i === 1000000) {
        toWrite = 'id,restaurant_id,review_filter\n';
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
