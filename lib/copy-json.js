'use strict';

const fs = require('fs');

const stdin = '/dev/stdin';
const stdout = '/dev/stdout';

//
let inFile = process.argv[2] === '-' ? stdin : process.argv[2];
let outFile = process.argv[3] ? process.argv[3] : stdout;
let outFileFlag = outFile === stdout ? 'a' : 'w';

fs.readFile(inFile, { encoding: 'utf8' }, (error, data) => {
  let json, pojo;
  if (error) {
    console.error(error.stack);
    return;
  }

  // parse the data into JSON
  try {
    pojo = JSON.parse(data);
  } catch (error) {
    console.error(error.stack);
    return;
  }

  // do something with the pojo

  // make a string out of the pojo
  json = JSON.stringify(pojo, null, 2);

  // save it
  fs.writeFile(outFile, json, { flag: outFileFlag }, error => {
    if (error) {
      console.error(error.stack);
      return;
    }

    console.error('\ncopied');
  });
});
