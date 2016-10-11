'use strict';

const fs = require('fs');

const stdin = '/dev/stdin';
const stdout = '/dev/stdout';

let inFile = process.argv[2] === '-' ? stdin : process.argv[2];
let outFile = process.argv[3] ? process.argv[3] : stdout;
let outFileFlag = outFile === stdout ? 'a' : 'w';

const readFile = (filepath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, { encoding: 'utf8' }, (error, data) => {
      if (error) { // this matches the 'error' we passed in with readFile
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

const writeFile = (filepath, contents, options) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, contents, options, error => {
      if (error) {
        reject(error);
      }
    });
  });
};

readFile(inFile)
  .then(JSON.parse)
  .then(pojo => pojo) // do something useful here
  .then(pojo => JSON.stringify(pojo, null, 2))
  .then(json => writeFile(outFile, json, { flag: outFileFlag }))
  .catch(console.error);
