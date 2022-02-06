import fs from 'fs';
import { solve1, solve2 } from './index.js';

const input = await fs.promises.readFile('./input.txt').toString();
const result1 = solve1(input);
const result2 = solve2(input);

const messages = [`Part 1: ${result1}`, `Part 2: ${result2}`];
console.log(messages.join('\n'));
