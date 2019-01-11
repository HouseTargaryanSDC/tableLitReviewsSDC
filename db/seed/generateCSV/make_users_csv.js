const faker = require('faker');
const path = require('path');
const fs = require('fs');


const file = fs.createWriteStream(path.join(__dirname, '../seedCSV/users_table.csv'));


// Use the code below to generate a csv file that contains n records
// formatted for the db schema

let id = -1;
const start = Date.now();

// make 1 million records
// change i in writeOneMillionTimes to equal the number of records you want in th csv file

function writeOneMillionTimes(writer, encoding, callback) {
  let i = 1000001;
  write();
  function write() {
    let ok = true;
    do {
      const first = faker.name.firstName();
      const last = faker.name.lastName();
      const user_initials = `${first[0]}${last[0]}`;
      const name = `${first} ${last}`;

      id += 1;
      i -= 1;

      let toWrite = `${id},${name},${user_initials},${faker.address.city()}` + '\n';

      if (i === 1000000) {
        toWrite = 'id,username,user_initials,user_city \n';
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
