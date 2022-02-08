import fs from 'fs';
import _ from 'lodash';

const producer = (n: number) => n === 0 ? [6,8] : [n-1];

export const readInput = async () => (await fs.promises.readFile('./input.txt')).toString();

export const solve1 = (initial: string, day: number) => _
  .range(day)
  .reduce((days) => days.flatMap(producer), initial.trim().split(',').map(Number))
  .length;

interface Cache { fish: number[]; count: number[] };

export const solve2 = (data: string, days: number) => {
  const initial = data.trim().split(',').map(Number);

  let count: number[] = _.range(9).map(_.constant(0));
  initial.forEach(k => (count[k] += 1));

  _.range(days).forEach(() => {
    const next: number[] = _.range(9).map(_.constant(0));

    next[0] = 0;
    next[6] = count[0];
    next[8] = count[0];

    _.range(1, 9).forEach(k => {
      next[k-1] += count[k];
    });

    count = next;
  });

  const length = _
    .range(9)
    .map(k => count[k])
    .reduce((a, b) => a + b);

  return length;
};

export const solve = solve2;
