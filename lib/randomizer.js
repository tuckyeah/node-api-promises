'use strict';

const fs = require('fs');

let inFile = process.argv[2];

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

let splitIntoLines = (content) => {
  return content.split('\n');
};

let removeTrailingNewline = (content) => {
  content.pop();
  return content;
};

let randomize = (array) => {
  return array.sort(() => {
    return 0.5 - Math.random();
  });
};

let logLines = (line) => {
  console.log(line);
};

pReadFile(inFile, { encoding: 'utf8' })
.then(splitIntoLines)
.then(removeTrailingNewline)
.then(randomize)
.then(lines => lines.forEach(logLines))
.catch(console.error);
