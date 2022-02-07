import fs from 'fs';
import _ from 'lodash';

export const readInput = async () => (await fs.promises.readFile('./input.txt')).toString();

export const solve1 = (initial: string, day: number) => _
  .range(day)
  .reduce((days) =>
    days.flatMap(n => n === 0 ? [6,8] : [n-1]),
    initial.trim().split(',').map(Number))
  .length;

export const solve2 = (data: string, day: number) => {
  return solve1(data, day);
};
