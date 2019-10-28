export const idX = x => x;

export const compose2 = (f, g) => (...args) => f(g(...args));

export const compose = (...fns) => (
  fns.length === 0 ? idX :
  fns.length > 1 ? fns.reduce(compose2) :
  fns[0]
);

export const pipe2 = (f, g) => (...args) => g(f(...args));

export const pipe = (...fns) => (
  fns.length === 0 ? idX :
  fns.length > 1 ? fns.reduce(pipe2) :
  fns[0]
);

export const call = args => fn => fn(...args);

const theSame = arr => (item, index) => Object.is(item, arr[index]);

export const isArgsEqual = (prev, next) => (
  prev.length === next.length && every(next, theSameOf(prev))
);
