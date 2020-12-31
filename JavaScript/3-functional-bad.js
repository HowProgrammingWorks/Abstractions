'use strict';

// Bad practices in FP below:
// 1. Global data structures
// 2. Mutable global state
// 3. Long anonymous lambdas
// 4. Complex syntactic hacks
// 5. Assignment statements
// 6. Return hack
// 7. Return hack
// 8. Magic numbers

const fs = require('fs');

const rpad = (s, count, char) => s.padEnd(count, char);
const lpad = (s, count, char) => s.padStart(count, char);

const padding = [rpad, lpad, lpad, lpad, lpad, lpad];
const width = [18, 10, 8, 8, 18, 6];

let maxDensity = 0;

const format = (file) => (
  fs.readFileSync(file, 'utf8').split('\n')
    .filter((s, i) => i && s)
    .map((line) => line.split(',').map((cell, i, arr) => (
      (i < 1 || i > 3) || (cell = parseInt(cell), arr[i] = cell),
      (i - 3) || (maxDensity = maxDensity > cell ? maxDensity : cell), cell
    )))
    .map((row) => (
      row.push(Math.round(row[3] * 100 / maxDensity).toString()), row
    ))
    .sort((r1, r2) => (r2[5] - r1[5]))
    .map((row) => (
      row.map((cell, i) => padding[i](cell + '', width[i])).join('')
    ))
    .join('\n')
);

console.log(format('./cities.csv'));
