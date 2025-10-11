'use strict';

const fs = require('node:fs');

const pipe = (...funcs) => (x) => funcs.reduce((x, fn) => fn(x), x);

const DENSITY_COL = 3;

const renderTable = (table) => {
  const cellWidth = [18, 10, 8, 8, 18, 6];
  return table.map((row) =>
    row.map((cell, i) => {
      const width = cellWidth[i];
      return i ? cell.toString().padStart(width) : cell.padEnd(width);
    }).join(''),
  ).join('\n');
};

const proportion = (max, val) => Math.round(val * 100 / max);

const calcProportion = (table) => {
  const res = table.map((row) => [...row]);
  res.sort((row1, row2) => row2[DENSITY_COL] - row1[DENSITY_COL]);
  const maxDensity = res[0][DENSITY_COL];
  for (const row of res) {
    const percent = proportion(maxDensity, row[DENSITY_COL]);
    row.push(percent);
  }
  return res;
};

const getDataset = (file) => {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.shift();
  lines.pop();
  return lines.map((line) => line.split(','));
};

const main = pipe(getDataset, calcProportion, renderTable);

console.log(main('./cities.csv'));
