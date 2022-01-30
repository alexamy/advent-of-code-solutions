import fs from 'fs';
import solve from './index.js';

const paths = await fs.promises.readFile('./input.txt');
const result = solve(paths.toString());

console.log(result);
