'use strict';

// 1. Control flow
// 2. Step by step execution
// 3. Assignment statements
// 4. Loops and conditions: for/if
// 5. State variables and side effects
// 6. Mutable data structures
// 7. Model of the process

const fs = require('fs');

function rpad(s, char, count) {
  const padding = char.repeat(count - s.length);
  return s + padding;
}

function lpad(s, char, count) {
  const padding = char.repeat(count - s.length);
  return padding + s;
}

const file = './cities.dat';
let data = null;
try {
  data = fs.readFileSync(file);
} catch (error) {
  console.log('Can\'t read file: ' + file);
}

if (data) {
  const lines = data.toString().split('\n');
  lines.pop();
  let first = true;
  for (const line of lines) {
    if (first) {
      first = false;
    } else {
      const [name, population, area, density, country] = line.split(',');
      let s = rpad(name, ' ', 18);
      s += lpad(population, ' ', 10);
      s += lpad(area, ' ', 10);
      s += lpad(density, ' ', 10);
      s += lpad(country, ' ', 18);
      console.log(s);
    }
  }
}
