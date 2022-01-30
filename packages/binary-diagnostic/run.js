import fs from 'fs';
import { solve1, solve2 } from './index.js';

const input = await fs.promises.readFile('./input.txt');

const result1 = solve1(input.toString());

const result2 = solve2();

const messages = [`Part 1: ${result1}`, `Part 2: ${result2}`];
console.log(messages.join('\n'));
