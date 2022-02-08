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
  const dayKeys = _.range(9);
  const initial = data.trim().split(',').map(Number);

  let count: number[] = dayKeys.map(_.constant(0));
  initial.forEach(k => (count[k] += 1));

  _.range(days).forEach(() => {
    const next: number[] = dayKeys.map(_.constant(0));

    dayKeys.forEach(k => {
      if(k === 0) {
        next[6] = count[0];
        next[8] = count[0];
      }
      else {
        next[k-1] += count[k];
      }
    });

    count = next;
  });

  const length = dayKeys
    .map(k => count[k])
    .reduce((a, b) => a + b);

  return length;
};

export const solve = solve2;
