import fs from 'fs';
import solve1 from './solve1.js';
import solve2 from './solve2.js';

const paths = await fs.promises.readFile('./input.txt');
const result1 = solve1(paths.toString());
const result2 = solve2(paths.toString());

console.log(`Part 1: ${result1}\nPart 2: ${result2}`);
