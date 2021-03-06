import { readInput, solve1, solve2 } from './index';

const data = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`;

it('calculates result for part 1', () => {
  expect(solve1(data)).toBe(5);
});

it('calculates result for part 1 file input', async () => {
  const input = await readInput();

  expect(solve1(input)).toBe(6311);
});

it('calculates result for part 2', () => {
  expect(solve2(data)).toBe(12);
});

it('calculates result for part 2 file input', async () => {
  const input = await readInput();

  expect(solve2(input)).toBe(19929);
});
