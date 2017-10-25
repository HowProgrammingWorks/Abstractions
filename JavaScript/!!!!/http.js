'use strict';

// 1. Control flow
// 2. Step by step execution
// 3. Mutable data structures

const https = require('https');

const url = 'https://github.com/HowProgrammingWorks/Index';
const request = https.get(url);

request.on('error', (err) => {
  console.dir({ err });
});

request.on('response', (res) => {
  //console.dir({ res });
  res.on('data', (data) => {
    console.log(data.toString());
  });
});
