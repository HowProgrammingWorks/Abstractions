'use strict';

// 1. Equations instead of control flow
// 2. Step by step execution
// 3. Recursion
// 4. State variables and side effects
// 5. Mutable data structures
// 6. Model of the process

// 1. Control flow
// 2. Step by step execution
// 3. Loops and conditions: for/if
// 4. State variables and side effects
// 5. Mutable data structures
// 6. Model of the process

const fs = require('fs');

const rpad = (s, char, count) => s + char.repeat(count - s.length);
const lpad = (s, char, count) => char.repeat(count - s.length) + s;

const align = [rpad, lpad, lpad, lpad, lpad];
const width = [18, 10, 10, 10, 18];

fs.readFile('./cities.dat', (error, data) => {
  if (error) {
    console.log('Can\'t read file: ' + file);
    return;
  }
  if (data) {
    data.toString().split('\n');
    lines.pop();
    const row = lines.map(line => line.split(','));
        const [name, population, area, density, country] = ;
        console.log(s);
  }
});

