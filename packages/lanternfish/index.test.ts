import { readInput, solve1, solve2 } from './index';

const data = `3,4,3,1,2`;

it('calculates result for part 1 day 18', () => {
  expect(solve1(data, 18)).toBe(26);
});

it('calculates result for part 1 day 80', () => {
  expect(solve1(data, 80)).toBe(5934);
});

it.skip('calculates result for part 1 file input', async () => {
  const input = await readInput();

  expect(solve1(input, 80)).toBe(390011);
});

// it wont work just by bruteforce
it.only('doesnt run too long', () => {
  const start = new Date();
  solve2(data, 130);
  const runTime = new Date().getTime() - start.getTime();

  expect(runTime).toBeLessThanOrEqual(500);
});

it.skip('calculates result for part 2', () => {
  expect(solve1(data, 256)).toBe(26984457539);
});

it.skip('calculates result for part 2 file input', async () => {
  const input = await readInput();

  expect(solve2(input, 256)).toBe({});
});
