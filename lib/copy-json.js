'use strict';

const fs = require('fs');

const stdin = '/dev/stdin';
const stdout = '/dev/stdout';

//
let inFile = process.argv[2] === '-' ? stdin : process.argv[2];
let outFile = process.argv[3] ? process.argv[3] : stdout;
let outFileFlag = outFile === stdout ? 'a' : 'w';

let pReadFile = (filename, options) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, options, (error, data) => {
      if (error) {
        reject(error);
      }

      resolve(data);
    });
  });
};

let pWriteFile = (filename, content, options) => {
  return new Promise((resolve, reject) => { // save it
    fs.writeFile(filename, content, options, error => {
      if (error) {
        reject(error);
      }

      resolve(true);
    });
  });
};

pReadFile(inFile, { encoding: 'utf8' })
.then(JSON.parse)  // parse the data into JSON
.then(pojo => pojo)  // do something with the pojo (replace with function)
.then(pojo => JSON.stringify(pojo, null, 2)) // make a string out of the pojo
.then(json => pWriteFile(outFile, json, { flag: outFileFlag }))
.then(() => console.log('\ncopied'))
.catch(console.error);
