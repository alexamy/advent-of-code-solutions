import { fileData, testData } from './data';
import { solve1, solve2 } from './index';

it('calculates result for part 1 test data', () => {
  expect(solve1(testData)).toBe(37);
});

it('calculates result for part 1', async () => {
  expect(solve1(fileData)).toBe(352997);
});

it.skip('calculates result for part 2 test data', () => {
  expect(solve2(testData)).toBe({});
});

it.skip('calculates result for part 2', async () => {
  expect(solve2(fileData)).toBe({});
});
