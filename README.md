[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Using Promises with the Node API

## Prerequisites

-   [ga-wdi-boston/node-api](https://github.com/ga-wdi-boston/node-api)

## Objectives

By the end of this, developers should be able to:

-   Explain the value of using promises instead of callback interfaces.
-   Read Node documentation that uses callbacks and translate that into
    implementations using promises.
-   Rewrite Node scripts using callbacks as scripts using promises.

## Preparation

1.  [Fork and clone](https://github.com/ga-wdi-boston/meta/wiki/ForkAndClone)
    this repository.
1.  Install dependencies with `npm install`.

## Drawbacks to Callbacks

Asynchronous code necessitates callbacks.
But dealing with lots of callbacks can be tricky:

-   Callbacks can be messy when they're nested: "callback hell". See [`lib/copy-json.js`](lib/copy-json.js).
-   Each callback will have to handle it's own errors if necessary.
-   In complex programs, it will be hard to tell in what order callbacks fire.

Fortunately, there's a better way: Promises.

### Lab: Research the Promises API

Promises are objects that represent steps in an asynchronous process.
As of 2016, they are natively supported in Node.

Take a few minutes to read the API documentation on [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
Note function signatures and argument types as you read.
What arguments does a promise take when it is constructed?

1.  [Promise Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#Syntax)
1.  [Promise.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#Methods_2)

### Annotate-Along: Using Promises Instead of Callbacks

Promises offer several advantages over callbacks.

-   Promises, like callbacks, make asynchronicity explicit.
-   Promises, unlike callbacks, clarify the order of execution.
-   Promises are easier to read than callbacks.
-   Promises can simplify error handling.

```js
// remember that callback is something you write, in this case to perform some
// processing on parsed JSON
const readJSON = function (filename, callback){
  fs.readFile(filename, 'utf8', function (err, res){
    if (err) {
      return callback(err); // what's going on here?
    }
    callback(null, JSON.parse(res)); // what if JSON.parse errors out?
  });
};
```

What are some weaknesses in this code? And the following?

```js
const readJSON = function (filename, callback){ // 👀 here
  fs.readFile(filename, 'utf8', function (err, res){
    if (err) {
      return callback(err); // pass the error from readFile
    }
    try {
      res = JSON.parse(res);
    } catch (ex) {
      return callback(ex); // pass the error from JSON.parse
    }
    callback(null, res); // don't pass the error, since we should have caught it
  });
};
```

What about this instead?

```js
const readJSON = function (filename) { // <-- look here
  return new Promise((resolve, reject) => {
    fs.readFile(filename, { encoding: 'utf8' }, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  }).then((res) => {
    return JSON.parse(res)
  });
};

readJSON('./example.json')
.then((pojo) => {
  callback(pojo); // do something with the object
})
.catch((err) => { // handle error conditions
  console.error(err);
});
```

That's too verbose. This is better:

```js
const readJSON = function (filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, { encoding: 'utf8' }, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  })
  .then(JSON.parse); // what can we surmise about .then?


readJSON('./example.jsom')
.then(callback) // do something with the object
.catch(console.error);  // handle error conditions
```

### Code-Along: Promisify `copy-json.js`

### Lab: Promisify `hey-yall.js`

### Lab: Promisify `randomizer.js`

## Additional Resources

-   [Promise - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
-   [Promises](https://www.promisejs.org/)
-   [Promisees · Courtesy of ponyfoo.com](http://bevacqua.github.io/promisees/)
-   [wbinnssmith/awesome-promises: A curated list of useful resources for JavaScript Promises](https://github.com/wbinnssmith/awesome-promises)
-   [How to escape Promise Hell — Medium](https://medium.com/@pyrolistical/how-to-get-out-of-promise-hell-8c20e0ab0513#.4wtj9hlvw)

## [License](LICENSE)

Source code distributed under the MIT license. Text and other assets copyright
General Assembly, Inc., all rights reserved.
