const faker = require('faker');
const path = require('path');
const fs = require('fs');

const file = fs.createWriteStream(path.join(__dirname, '../seedCSV/users_table.csv'));

let id = 1;

const numberOfRecords = 10; // 1000000;

for (let i = 0; i <= numberOfRecords; i += 1) {
  if (i === 0) {
    file.write('id,user_name,user_initials,user_city \n', (err) => {
      if (err) {
        console.log('error writing to file', err);
      } else {
        console.log('success writing headers in csv');
      }
    });
  } else {
    const first = faker.name.firstName();
    const last = faker.name.lastName();
    const user_initials = `${first[0]}${last[0]}`;
    const name = `${first} ${last}`; 
    const toWrite = `${id},${name},${user_initials},${faker.address.city()}` + '\n';

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
