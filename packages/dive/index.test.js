import solve1 from './solve1.js';
import solve2 from './solve2.js';

const route = `
forward 5
down 5
forward 8
up 3
down 8
forward 2`;

it('calculates test route for part 1', () => {
  expect(solve1(route)).toBe(150);
});

it('calculates test route for part 2', () => {
  expect(solve2(route)).toBe(900);
});
