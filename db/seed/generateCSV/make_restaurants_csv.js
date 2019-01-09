const faker = require('faker');
const path = require('path');
const fs = require('fs');
const { performance, PerformanceObserver } = require('perf_hooks');

const file = fs.createWriteStream(path.join(__dirname, '../seedCSV/restaurants_table.csv'));

let id = -1;

// make 1 million records

function writeOneMillionTimes(writer, encoding, callback) {
  let i = 10;
  write();
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      const name = faker.company.companyName().split(',').join('');
      let toWrite = `${id}, ${name},` + '\n';

      if (i === 9) {
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

const wrapped = performance.timerify(writeOneMillionTimes);

const obs = new PerformanceObserver((list) => {
  console.log(list.getEntries()[0].duration);
  obs.disconnect();
});
obs.observe({ entryTypes: ['function'] });

wrapped(file, 'utf-8', () => { file.end(); });
