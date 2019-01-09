const faker = require('faker');
const path = require('path');
const fs = require('fs');

const file = fs.createWriteStream(path.join(__dirname, '../seedCSV/restaurants_table.csv'));

let id = 1;

// make 1 million records

const numberOfRecords = 10; // 1000000;

for (let i = 0; i <= numberOfRecords; i += 1) {
  if (i === 0) {
    file.write('id,restaurant_name \n', (err) => {
      if (err) {
        console.log('error writing to file', err);
      } else {
        console.log('success writing headers in csv');
      }
    });
  } else {
    const name = faker.company.companyName().split(',').join('');
    const toWrite = `${id}, ${name},` + '\n';
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
