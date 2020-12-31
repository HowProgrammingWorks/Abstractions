'use strict';

// FP paradigm:
// 1. Equations instead of control flow
// 2. Lazy calculations
// 3. Parallel execution ready
// 4. Recursion instead of loops
// 5. Immutability, no state
// 6. No variables, no side effects
// 7. Math model

const fs = require('fs');

const proportion = (max, val) => Math.round(val * 100 / max);
const compose = (...funcs) => (x) => funcs.reduce((x, fn) => fn(x), x);

const cellPad = (i, s, width) => (i ? s.padStart(width) : s.padEnd(width));
const cellWidth = (i) => [18, 10, 8, 8, 18, 6][i];

const renderCell = (cell, i) => cellPad(i, cell + '', cellWidth(i));
const renderRow = (row) => row.map(renderCell).join('');
const renderTable = (table) => table.map(renderRow).join('\n');

const densityCol = () => 3;
const sortByDensity = (table) => table.sort(
  (row1, row2) => (row2[densityCol()] - row1[densityCol()])
);
const calcColumn = (table, max) => table.map(
  (row) => (row.push(proportion(max, row[densityCol()])), row)
);
const calcProportion = (table) => calcColumn(table, table[0][densityCol()]);

const parseTable = (lines) => lines.map((line) => line.split(','));
const toLines = (data) => data.split('\n').filter((s, i) => i && s);
const readFile = (file) => fs.readFileSync(file, 'utf8');
const getDataset = compose(readFile, toLines, parseTable);

const main = compose(getDataset, sortByDensity, calcProportion, renderTable);

console.log(main('./cities.csv'));
