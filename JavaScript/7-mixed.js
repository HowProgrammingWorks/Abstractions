'use strict';

const fs = require('fs');

const compose = (...funcs) => (x) => funcs.reduce((x, fn) => fn(x), x);

const DENSITY_COL = 3;

const renderTable = (table) => {
  const cellWidth = [18, 10, 8, 8, 18, 6];
  return table.map((row) => (
    row.map((cell, i) => {
      const width = cellWidth[i];
      return i ? cell.toString().padStart(width) : cell.padEnd(width);
    }).join('')
  )).join('\n');
};

const proportion = (max, val) => Math.round(val * 100 / max);

const calcProportion = (table) => {
  table.sort((row1, row2) => row2[DENSITY_COL] - row1[DENSITY_COL]);
  const maxDensity = table[0][DENSITY_COL];
  table.forEach((row) => {
    row.push(proportion(maxDensity, row[DENSITY_COL]));
  });
  return table;
};

const getDataset = (file) => {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.shift();
  lines.pop();
  return lines.map((line) => line.split(','));
};

const main = compose(getDataset, calcProportion, renderTable);

console.log(main('./cities.csv'));
