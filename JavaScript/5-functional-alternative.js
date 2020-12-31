'use strict';

const fs = require('fs');

const proportion = (max, val) => Math.round(val * 100 / max);

const compose = (...funcs) => (x) => funcs.reduce((x, fn) => fn(x), x);

const densityCol = 3;
const cellWidth = [18, 10, 8, 8, 18, 6];

const renderTable = (table) => table
  .map((row) => row
    .map((cell, i) => cell
      .toString()[(i ? 'padStart' : 'padEnd')](cellWidth[i]))
    .join(''))
  .join('\n');

const calcProportion = (table) => (
  table.sort((row1, row2) => (row2[densityCol] - row1[densityCol])),
  table.map((row) => (
    row.push(proportion(table[0][densityCol], row[densityCol])), row
  ))
);

const getDataset = (file) => fs.readFileSync(file, 'utf8')
  .split('\n')
  .filter((s, i) => i && s)
  .map((line) => line.split(','));

const main = compose(getDataset, calcProportion, renderTable);

console.log(main('./cities.csv'));
