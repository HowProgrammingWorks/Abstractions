'use strict';

// 1. Descriptive syntactic structures
// 2. Domain specific language
// 3. No direct computer execution
// 4. No loops, no recursion, no iteration
// 5. Special translator/interpreter needed
// 6. No variables, no side effects
// 7. Task, result or process description

const fs = require('fs');

const rpad = (s, char, count) => s + char.repeat(count - s.length);
const lpad = (s, char, count) => char.repeat(count - s.length) + s;

const task = {
  file: './cities.dat',
  align: [rpad, lpad, lpad, lpad, lpad],
  width: [18, 10, 8, 8, 18, 6],
  filter: (s, i) => (s && i),
  pad: ' ',
  separator: ',',
  compare: 'density',
  order: 'area',
};

const resolve = (task) => {
  const lines = fs.readFileSync(task.file).toString().split('\n');
  const renderCell = (cell, i) => task.align[i](cell, task.pad, task.width[i]);
  const renderRow = line => line.split(task.separator).map(renderCell).join('');
  const result = lines.filter(task.filter).map(renderRow).join('\n');
  return result;
};

console.log(resolve(task));
