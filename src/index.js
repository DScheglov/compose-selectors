import { call } from './utils';
import { cacheAll } from './caching';

export const selector = (inputs, fn, decorator) => {
  const decoratedFn = (
    typeof decorator === 'function'
      ? decorator(fn)
      : fn
  );

  return function () {
    return decoratedFn.apply(
      void 0, inputs.map(call(arguments))
    );
  }
}

export const factory = cacheAll;