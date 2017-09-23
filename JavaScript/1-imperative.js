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
  let table = [];
  let maxDensity = 0;
  for (const line of lines) {
    if (first) {
      first = false;
    } else {
      const [name, population, area, density, country] = line.split(',');
      const d = parseInt(density);
      if (d > maxDensity) maxDensity = d;
      table.push([name, population, area, density, country]);
    }
  }
  for (const row of table) {
    const density = row[3];
    const compare = Math.round(density * 100 / maxDensity);
    row.push(compare.toString());
  }
  table = table.sort((r1, r2) => r2[5] - r1[5]);
  for (const row of table) {
    const [name, population, area, density, country, compare] = row;
    let s = rpad(name, ' ', 18);
    s += lpad(population, ' ', 10);
    s += lpad(area, ' ', 8);
    s += lpad(density, ' ', 8);
    s += lpad(country, ' ', 18);
    s += lpad(compare, ' ', 6);
    console.log(s);
  }
}
