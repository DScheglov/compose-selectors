import { call } from './utils';
import { cacheAll, cacheLast } from './caching';
import { slice } from './list-fn';

export function selector() {
  const inputs = slice(arguments);
  const mainSelector = inputs.pop();

  return function() {
    return mainSelector.apply(
      void 0, inputs.map(call(arguments))
    );
  }
}

export const selectorFactory = cacheAll;

export { cacheAll, cacheLast };