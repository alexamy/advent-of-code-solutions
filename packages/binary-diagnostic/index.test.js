import { readInput, solve1, solve2 } from './index.js';

const data = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

it('calculates result for part 1', () => {
  expect(solve1(data)).toBe(198);
});

it('calculates result for part 1 file input', async () => {
  const input = (await readInput()).toString();

  expect(solve1(input)).toBe(1071734);
});

it('calculates result for part 2', () => {
  expect(solve2(data)).toBe(230);
});

it('calculates result for part 2 file input', async () => {
  const input = (await readInput()).toString();

  expect(solve2(input)).toBe(6124992);
});
