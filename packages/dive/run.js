import fs from 'fs';
import solve from './solve1.js';

const paths = await fs.promises.readFile('./input.txt');
const result1 = solve(paths.toString());

console.log(`Part 1: ${result1}`);
