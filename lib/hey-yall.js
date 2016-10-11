'use strict';

const fs = require('fs');

let inFile = process.argv[2];

const readFile = (inFile) => {
  return new Promise((resolve, reject) => {
    fs.readFile(inFile, { encoding: 'utf8' }, (error, content) => {
      if (error) {
        reject(error);
      } else {
        let lines = content.split('\n');
        if (error) {
          reject(error);
        } else {
          lines.pop();
          resolve(lines);
        }
      }
  });
});
};

const sayHello = (lines) => {
  lines.forEach((line) => {
    console.log('Hello, ' + line + '!');
  });
};

readFile(inFile)
  .then(sayHello)
  .catch(console.error);
