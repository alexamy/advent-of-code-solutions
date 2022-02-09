import { solve1, solve2 } from './index';
import { fileData, testData } from './data';

it('calculates result for part 1 test data', () => {
  expect(solve1(testData)).toBe(37);
});

it('calculates result for part 1', () => {
  expect(solve1(fileData)).toBe(352997);
});

it('calculates result for part 2 test data', () => {
  expect(solve2(testData)).toBe(168);
});

it.skip('calculates result for part 2', () => {
  expect(solve2(fileData)).toBe({});
});
