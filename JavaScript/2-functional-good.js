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
const pad = i => (i ? lpad : rpad);
const width = i => [18, 10, 8, 8, 18, 6][i];
const readLines = file => fs.readFileSync(file).toString().split('\n');
const filterRow = (s, i) => (i && s);
const renderCell = (cell, i) => pad(i)(cell, ' ', width(i));
const renderRow = line => line.split(',').map(renderCell).join('');
const render = file => (
  readLines(file).filter(filterRow).map(renderRow).join('\n')
);

console.log(render('./cities.dat'));
