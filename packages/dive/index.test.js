import solve from './index.js';

it('calculates test route', () => {
  const route = `
forward 5
down 5
forward 8
up 3
down 8
forward 2`;

  expect(solve(route)).toBe(150);
});
