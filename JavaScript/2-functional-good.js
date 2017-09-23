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
const isRow = (s, i) => (i && s);
const read = file => fs.readFileSync(file).toString().split('\n').filter(isRow);
const renderCell = (cell, i) => pad(i)(cell + '', ' ', width(i));
const renderRow = row => row.map(renderCell).join('');
const row = line => line.split(',').map((cell, i) => (i === 3 ? +cell : cell));
const table = file => read(file).map(row);
const render = table => table.map(renderRow).join('\n');
const max = (a, b) => (a > b ? a : b);
const relative = (max, val) => Math.round(val * 100 / max);
const maxCol = (i, table) => [table, table.map(row => row[i]).reduce(max)];
const calc = tuple => tuple[0].map(r => (r.push(relative(tuple[1], r[3])), r));
const prepare = file => render(calc(maxCol(3, table(file))));

console.log(prepare('./cities.dat'));
