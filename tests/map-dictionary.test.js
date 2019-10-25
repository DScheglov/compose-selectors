import MapDictionary from '../src/map-dictionary';

describe('MapDictionary', () => {
  it('should be possible to create an instance', () => {
    const cache = MapDictionary();
    expect(cache.set).toBeInstanceOf(Function);
    expect(cache.get).toBeInstanceOf(Function);
  });

  it('should be possible to set value without tokens', () => {
    const cache = MapDictionary();
    const token = {};
    cache.set([], token);
    expect(
      cache.get([])
    ).toBe(token);
  });

  it('should be possible to set value with single obj', () => {
    const cache = MapDictionary();
    const token = {};
    cache.set([token], token);
    expect(
      cache.get([token])
    ).toBe(token);
  });

  it('should be possible to set value with two objs', () => {
    const cache = MapDictionary();
    const token1 = {};
    const token2 = {};
    const token = {};
    cache.set([token1, token2], token);
    expect(
      cache.get([token1, token2])
    ).toBe(token);
  });

  it('should be possible to set several values with two objs', () => {
    const cache = MapDictionary();
    const token1 = {};
    const token2 = {};
    const token3 = {};

    cache.set([token1, token2], token1);
    cache.set([token1, token3], token2);
    expect(
      cache.get([token1, token2])
    ).toBe(token1);
    expect(
      cache.get([token1, token3])
    ).toBe(token2);
  });

  it('should return value only if order of tokens is correct', () => {
    const cache = MapDictionary();
    const token1 = {};
    const token2 = {};
    const token = {};
    cache.set([token1, token2], token);

    expect(
      cache.get([token2, token1])
    ).toBeUndefined();
  });

  it('should work with primitives', () => {
    const cache = MapDictionary();
    const token1 = 1;
    const token2 = 'string';
    const token = {};
    cache.set([token1, token2], token);
    expect(
      cache.get([token1, token2])
    ).toBe(token);
  });
});
