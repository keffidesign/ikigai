// ---------------------------------------------------------------------------------------------------------------------
// Pure functional code

const assignStrategySteps = strategy => records => map((record, i) => {

  return { ...record, strategyStep: get(i, strategy, last(strategy)) };
})(records);

const hasTimeCome = timestamp => lastRecord => {

  // console.log('hasTimeCome', lastRecord[0].word, get('createdAt', lastRecord[0]), timestamp - get('createdAt', lastRecord[0]), (get('strategyStep', lastRecord[0])) * 86400000);

  if (!lastRecord[0]) return true;

  return lastRecord[0] ? timestamp - get('createdAt', lastRecord[0]) > (get('strategyStep', lastRecord[0]) * 86400000) : false;
};

const shouldBePracticed = pipe(
  takeWhile(record => get('isPositive', record)),
  assignStrategySteps([ 1, 2, 7, 14, 30 ]), // @todo pass strategy
  take(1),
  hasTimeCome(Date.now()) // @todo pass immutable timestamp
);

// Compartmentalize - to separate something into parts and not allow those parts to mix together.
const compartmentalize = records => reduce((map, record) => {

  const wordId = get('wordId', record);

  return { ...map, [ wordId ]: [ ...get(wordId, map, []), record ] }
}, {}, records);

// const getWordsToPractice = wordsMap => filter(key => shouldBePracticed(get(key, wordsMap)), keys(wordsMap));

const getWordsToPractice = wordsMap => pipe(
  wordsMap => keys(wordsMap),
  filter(key => shouldBePracticed(get(key, wordsMap))),
  (args) => {

    console.log('--filter', args);

    return args
  },
  map(id => get(id, wordsMap)[0]),

)(wordsMap);

export const main = pipe(
  compartmentalize,
  getWordsToPractice
);

// ---------------------------------------------------------------------------------------------------------------------
// Non functional code

// Minimal amount of days between repetition.
const spacedRepetitionStrategy = {
  id: `1-2-7-14-30-60-90`,
  cycles: [ 1, 2, 7, 14, 30, 60, 90 ]
};

import data from '../mockups/dataset.json';

const now = Date.now();

console.time('app');

// const result = main(data.slice(0, 100));

console.timeEnd('app');

// Not referentially transparent because of I/O.
// console.log(result);
