const faker = require('faker');
const path = require('path');
const fs = require('fs');

const file = fs.createWriteStream(path.join(__dirname, '../seedCSV/mongo_users.csv'));

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
  let i = 1000001;
  let user_id = -1;
  write();
  function write() {
    let ok = true;
    do {
      // id += 1;
      i -= 1;
      user_id += 1;
      // removed id from the toWrite line below

      let toWrite = `${user_id},10` + '\n';

      if (i === 1000000) {
        toWrite = 'user_id,user_total_reviews\n';
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

