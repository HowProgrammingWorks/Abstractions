'use strict';

// 1. Descriptive syntactic structures
// 2. Domain specific language
// 3. No direct computer execution
// 4. No loops, no recursion, no iteration
// 5. Special translator/interpreter needed
// 6. No variables, no side effects
// 7. Task, result or process description

const task = {
  file: './cities.csv',
  types: [String, Number, Number, Number, String, Number],
  width: [18, 10, 8, 8, 18, 6],
  pad: ' ',
  separator: ',',
  compare: 'density',
  order: 'density',
};

console.log(task);
