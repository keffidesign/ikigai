// Set of functions to work with functions

export const pipe = (...fns) => initialValue => reduce((returnValue, fn) => fn(returnValue), initialValue, fns);
