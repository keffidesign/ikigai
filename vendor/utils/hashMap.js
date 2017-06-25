// Set of functions to work with hashMaps

export const keys = hashMap => Object.keys(hashMap);

export const get = (key, collection, otherwise) => collection[key] || otherwise;
