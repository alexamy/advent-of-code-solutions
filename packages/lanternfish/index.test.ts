import { readInput, solve } from './index';

const data = `3,4,3,1,2`;

it('calculates result for part 1 day 18', () => {
  expect(solve(data, 18)).toBe(26);
});

it('calculates result for part 1 day 80', () => {
  expect(solve(data, 80)).toBe(5934);
});

it('calculates result for part 1 file input', async () => {
  const input = await readInput();

  expect(solve(input, 80)).toBe(390011);
});

// it wont work just by bruteforce
it('doesnt run too long', () => {
  const start = new Date();
  solve(data, 130);
  const runTime = new Date().getTime() - start.getTime();

  expect(runTime).toBeLessThanOrEqual(500);
});

// it wont work just by bruteforce
it('doesnt run too long again', () => {
  const start = new Date();
  solve(data, 192);
  const runTime = new Date().getTime() - start.getTime();

  expect(runTime).toBeLessThanOrEqual(500);
});

it.skip('calculates result for part 2', () => {
  expect(solve(data, 256)).toBe(26984457539);
});

it.skip('calculates result for part 2 file input', async () => {
  const input = await readInput();

  expect(solve(input, 256)).toBe({});
});
