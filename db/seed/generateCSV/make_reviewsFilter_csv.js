const path = require('path');
const fs = require('fs');

const file = fs.createWriteStream(path.join(__dirname, '../seedCSV/reviewsFilters_table.csv'));

const start = Date.now();

function randomBooleanValue(num) {
  return num % 2 === 0;
}

function generateRandomNumberBetween(beg, end) {
  return Math.floor((Math.random() * (end - beg + 1)) + beg);
}


let id = -1;
const filters = ['Burgers', 'Burritos', 'Pizzas', 'Tacos', 'Sandwiches'];

// make 10 million records

function writeOneMillionTimes(writer, encoding, callback) {
  let i = 10000000;
  write();
  function write() {
    let ok = true;
    do {
      const restaurant_id = generateRandomNumberBetween(1, 10000000);
      const review_filter = filters[i % 5];
      id += 1;
      i -= 1;

      let toWrite = `${id},${restaurant_id},${review_filter}` + '\n';

      if (i === 9999999) {
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
