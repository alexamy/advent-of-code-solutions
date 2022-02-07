import { readInput, solve1, solve2 } from './index';

const solve = async () => {
  const input = await readInput();
  const result1 = solve1(input);
  const result2 = solve2(input);

  const messages = [`Part 1: ${result1}`, `Part 2: ${result2}`];
  console.log(messages.join('\n'));
}

solve();
