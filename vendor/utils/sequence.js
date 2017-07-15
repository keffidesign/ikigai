// Set of functions to work with sequences

export const reduce = (fn, initial, sequence) => sequence.reduce(fn, initial);

export const map = fn => sequence => sequence.map(fn);

export const filter = fn => sequence => sequence.filter(fn);

export const take = count => sequence => sequence.slice(0, count);

// For performance implement with `while`
// @see http://sufflavus.github.io/JS-Tips-Take-While
export const takeWhile = predicate => sequence => {

  const endIndex = sequence.findIndex(item => !predicate(item));

  return endIndex === -1 ? sequence : sequence.slice(0, endIndex);
};

export const length = sequence => sequence.length;

/**
 * Returns a sequence that contains only last element of initial sequence
 *
 * @param sequence
 */
export const last = sequence => sequence.slice(-1);

//const has = (fn, list) => list.find(fn) !== undefined;

export const range = n => new Array(n).fill().map((_, i) => i + 1);
