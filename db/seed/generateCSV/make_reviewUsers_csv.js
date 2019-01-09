const faker = require('faker');
const path = require('path');
const fs = require('fs');

const file = fs.createWriteStream(path.join(__dirname, '../seedCSV/reviewUsers_table.csv'));


function randomBooleanValue(num) {
  return num % 2 === 0;
}

function generateRandomNumberBetween(beg, end) {
  return Math.floor((Math.random() * (end - beg + 1)) + beg);
}


let id = 1;

const numberOfRecords = 10; // 1000000;

for (let i = 0; i <= numberOfRecords; i += 1) {
  if (i === 0) {
    file.write('id,user_id,restaurant_id \n', (err) => {
      if (err) {
        console.log('error writing to file', err);
      } else {
        console.log('success writing headers in csv');
      }
    });
  } else {
    const restaurant_id = generateRandomNumberBetween(1, 1000000);
    for (let j = 0; j < 10; j += 1) {
      const user_id = generateRandomNumberBetween(1, 1000000);
      const toWrite = `${id},${user_id},${restaurant_id}` + '\n';
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
}
file.end();
