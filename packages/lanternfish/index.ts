import fs from 'fs';
import _ from 'lodash';

export const readInput = async () => (await fs.promises.readFile('./input.txt')).toString();

export const solve1 = (data: string, day: number) => _
  .chain(null)
  .range(day)
  .reduce((days) =>
    days.flatMap(n => n === 0 ? [6,8] : [n-1]),
    data.trim().split(',').map(Number))
  .value()
  .length;

export const solve2 = (data: string, day: number) => {};
