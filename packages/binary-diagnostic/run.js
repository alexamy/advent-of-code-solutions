import { readInput, solve1, solve2 } from './index.js';

const input = (await readInput()).toString();
const result1 = solve1(input);
const result2 = solve2(input);

const messages = [`Part 1: ${result1}`, `Part 2: ${result2}`];
console.log(messages.join('\n'));
