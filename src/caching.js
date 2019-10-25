import MapDictionary from './map-dictionary';
import { isArgsEqual } from './utils';

export const cacheAll = fn => {
  const cache = MapDictionary();

  return function () {
    const result = cache.get(arguments);
    if (result) return result.value;
    const value = fn.apply(void 0, arguments);
    cache.set(arguments, { value });
    return value;
  }
}

export const cacheLast = fn => {
  let prev = null;
  let result;

  return function () {
    if (prev !== null && isArgsEqual(prev, arguments)) return result;
    result = fn.apply(void 0, arguments)
    prev = arguments;
    return result;
  }
}