const faker = require('faker');
const path = require('path');
const fs = require('fs');

// Use the code below to generate a csv file that contains n records
// formatted for the db schema


const file = fs.createWriteStream(path.join(__dirname, '../seedCSV/restaurants_table.csv'));

let id = -1;
let start = Date.now();

// make 1 million records!
// change i in writeOneMillionTimes to equal the number of records you want in th csv file

function writeOneMillionTimes(writer, encoding, callback) {
  let i = 1000001;
  write();
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      const name = faker.company.companyName().split(',').join('');
      let toWrite = `${id}, ${name},` + '\n';

      if (i === 1000000) {
        toWrite = 'id,restaurant_name \n';
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
