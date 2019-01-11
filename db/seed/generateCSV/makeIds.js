const faker = require('faker');

function generateRandomNumberBetween(beg, end) {
  return Math.floor((Math.random() * (end - beg + 1)) + beg);
}

// This will print 25 ids between a given range of ids
// ids generated within each quarter are random

let ids = '';

for (let i = 0; i < 25; i += 1) {
  ids += ' ' + (generateRandomNumberBetween(900001, 1000000));
}

console.log(ids);
