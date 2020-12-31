'use strict';

const fs = require('fs');

/* fp */
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
const curry = (fn) => (...args) => fn.bind(null, ...args);
const map = curry((fn, arr) => arr.map(fn));
const join = curry((str, arr) => arr.join(str));
const split = curry((splitOn, str) => str.split(splitOn));
const sort = curry((compareFn, arr) => arr.sort(compareFn));
const filter = curry((filterFn, arr) => arr.filter(filterFn));

/* utility */
const first = (arr) => arr[0];
const skipFirst = (arr) => arr.slice(1);
const hasValue = (val) => !!val;
const toStr = (val) => val.toString();
const appendCell = (row, value) => row.concat(value);
const cellPad = (index, str, width) => (
  index ? str.padStart(width) : str.padEnd(width)
);
const cellWidth = (index) => [18, 10, 8, 8, 18, 6][index];

const renderCell = (cell, index) => (
  cellPad(index, toStr(cell), cellWidth(index))
);
const renderRow = pipe(map(renderCell), join(''));
const renderTable = pipe(map(renderRow), join('\n'));

const getDensityCell = (row) => parseInt(row[3], 10);
const proportion = (max, val) => Math.round(parseInt(val, 10) * 100 / max);
const sortRowsByDensity = sort(
  (row1, row2) => getDensityCell(row2) - getDensityCell(row1)
);

const calcMaxDensity = pipe(
  sortRowsByDensity,
  first,
  getDensityCell
);

const calcRowsProportionToMax = (rows) => (max) => rows.map(pipe(
  getDensityCell,
  (densityCell) => proportion(max, densityCell)
));

const appendProportionCell = (rows) => (proportions) => rows.map(
  (row, index) => appendCell(row, proportions[index])
);

const appendTableProportionCol = (rows) => pipe(
  calcMaxDensity,
  calcRowsProportionToMax(rows),
  appendProportionCell(rows)
)(rows);

const parseTableLines = map(split(','));

const toLines = pipe(
  split('\n'),
  skipFirst,
  filter(hasValue)
);

const readFile = (file) => fs.readFileSync(file, 'utf8');

const getDataset = pipe(
  readFile,
  toLines,
  parseTableLines
);

const main = pipe(
  getDataset,
  sortRowsByDensity,
  appendTableProportionCol,
  renderTable
);

console.log(main('./cities.csv'));
