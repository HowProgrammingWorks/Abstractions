'use strict';

// 1. Equations instead of control flow
// 2. Lazy calculations
// 3. Parallel execution ready
// 4. Recursion instead of loops
// 5. Immutability, no state
// 6. No variables, no side effects
// 7. Math model

const fs = require('fs');

const rpad = (s, char, count) => s + char.repeat(count - s.length);
const lpad = (s, char, count) => char.repeat(count - s.length) + s;
const padding = [rpad, lpad, lpad, lpad, lpad, lpad];
const width = [18, 10, 8, 8, 18, 6];
let maxDensity = 0;

const format = file => (
  fs.readFileSync(file).toString().split('\n')
    .filter((s, i) => i && s)
    .map(line => line.split(',').map((cell, i, arr) => (
      (i < 1 || i > 3) || (cell = parseInt(cell), arr[i] = cell),
      (i - 3) || (maxDensity = maxDensity > cell ? maxDensity : cell), cell
    ))).map(row => (
      row.push(Math.round(row[3] * 100 / maxDensity).toString()),
      row.map((cell, i) => padding[i](cell + '', ' ', width[i])).join('')
    )).join('\n')
);

console.log(format('./cities.dat'));
