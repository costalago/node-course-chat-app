let moment = require('moment');

// let date = new Date();
// let months = ['Jan', 'Feb'];
// console.log(date.getMonth());


let date = moment();
date.add(2, 'year').subtract(3, 'months');
console.log(date.format('MMMM Do, YYYY'));

console.log(date.format('hh:mm a'));


let someTimestamp = moment().valueOf();
console.log(someTimestamp);
let date1 = moment(someTimestamp);
console.log(date.format('hh:mm a'));