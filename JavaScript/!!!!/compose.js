const compose = (...funcs) => x => funcs.reduce((x, fn) => fn(x), x);

const inc = x => ++x;
const square = x => x * x;
const f = compose(inc, square);

console.log(f(5));
