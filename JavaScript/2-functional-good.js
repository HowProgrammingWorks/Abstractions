'use strict';

// 1. Equations instead of control flow
// 2. Lazy calculations
// 3. Parallel execution ready
// 4. Recursion instead of loops
// 5. Immutability, no state
// 6. No variables, no side effects
// 7. Math model

const fs = require('fs');

const proportion = (max, val) => Math.round(val * 100 / max);
const compose = (...funcs) => x => funcs.reduce((x, fn) => fn(x), x);
const rpad = (s, char, count) => s + char.repeat(count - s.length);
const lpad = (s, char, count) => char.repeat(count - s.length) + s;

const cellPad = i => (i ? lpad : rpad);
const cellWidth = i => [18, 10, 8, 8, 18, 6][i];

const renderCell = (cell, i) => cellPad(i)(cell + '', ' ', cellWidth(i));
const renderRow = row => row.map(renderCell).join('');
const renderTable = table => table.map(renderRow).join('\n');

const sortByDensity = table => table.sort((r1, r2) => (r2[3] - r1[3]));
const calc = (table, max) => table.map(r => (r.push(proportion(max, r[3])), r));
const calcProportion = table => calc(table, table[0][3]);

const parseTable = lines => lines.map(line => line.split(','));
const toLines = data => data.split('\n').filter((s, i) => i && s);
const readFile = file => fs.readFileSync(file).toString();
const getDataset = compose(readFile, toLines, parseTable);
const main = compose(getDataset, sortByDensity, calcProportion, renderTable);

console.log(main('./cities.dat'));
