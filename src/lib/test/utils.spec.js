import { int } from '../utils.js';

describe('int', () => {
  test('convert float to int', () => {
    expect(int(1.01)).toEqual(1);
  });
});
