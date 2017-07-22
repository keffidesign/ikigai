import * as sequence from './sequence.js';
import * as hashMap from './hashMap.js'
import * as func from './function.js';

import * as mutable from './mutable.js';

[
  sequence,
  hashMap,
  func,

  mutable
].map(funcs => {

  Object
    .keys(funcs)
    .map(funcName => (window || global)[funcName] = funcs[funcName]);
});
