import { readInput, solve1, solve2 } from './index';

const data = `
`;

it.todo('calculates result for part 1', () => {
  expect(solve1(data)).toBe({});
});

it.skip('calculates result for part 1 file input', async () => {
  const input = await readInput();

  expect(solve1(input)).toBe({});
});

it.skip('calculates result for part 2', () => {
  expect(solve2(data)).toBe({});
});

it.skip('calculates result for part 2 file input', async () => {
  const input = await readInput();

  expect(solve2(input)).toBe({});
});
