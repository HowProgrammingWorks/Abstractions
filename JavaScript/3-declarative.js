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
  width: [18, 10, 10, 10, 18],
  toString() {
    return (fs.readFileSync(this.file).toString().split('\n')
      .filter((s, i) => i && s)
      .map(line => line.split(',')
        .map((cell, i) => this.align[i](cell, ' ', this.width[i]))
        .join('')
      ).join('\n')
    );
  }
};

console.log(task.toString());
