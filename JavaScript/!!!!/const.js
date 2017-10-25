'use strict';

con { ℕ, 𝕊 } = require('mathtypes');

const util = require('util');

const ℕ = (x) => {
  if (typeof(x) !== 'number') {
    throw new TypeError('Дыбилыбилять, это что, натуральное число?');
  }
  const ℕ = () => x;
  const methods = {
    is: value => value.name === 'ℕ',
    get type() {
      return ℕ.name;
    },
    [util.inspect.custom]: () => x
  };
  return Object.assign(ℕ, methods);
};

const 𝕊 = (x) => {
  if (typeof(x) !== 'string') {
    throw new TypeError('Дыбилыбилять, строка что такое, знаешь?');
  }
  const 𝕊 = () => x;
  const methods = {
    is: value => value.name === '𝕊',
    get type() {
      return 𝕊.name;
    },
    [util.inspect.custom]: () => x
  };
  return Object.assign(𝕊, methods);
};

const sum = (a, b) => ℕ(a) + ℕ(b);

const a = ℕ(5);

console.log('a.type === ' + a.type);

const 人 = {
  name: 𝕊('Marcus Aurelius'),
  city: 𝕊('Rome'),
  born: ℕ(121)
};

console.log({ 人 });
console.log(人.name);
console.log(人.name + ' from ' + 人.city);
