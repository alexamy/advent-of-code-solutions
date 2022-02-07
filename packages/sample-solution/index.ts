import fs from 'fs';

export const readInput = async () => (await fs.promises.readFile('./input.txt')).toString();

export const solve1 = (data: string) => {};

export const solve2 = (data: string) => {};
