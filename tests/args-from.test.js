import { selector } from '../src';

const summ = (a, b) => a + b;
const get = name => entity => entity[name];

describe('selector', () => {
  it('should compose inputs', () => {
    const summOfXY = selector(
      [get('x'), get('y')],
      summ
    );
    expect(summOfXY({ x: 1, y: 2 })).toBe(3);
  });
});
