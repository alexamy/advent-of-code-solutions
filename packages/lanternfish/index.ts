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
  let counts: number[] = dayKeys.map(_.constant(0));

  data.trim().split(',').map(Number).forEach(k => (counts[k] += 1));

  _.range(days).forEach(() => {
    const next: number[] = dayKeys.map(_.constant(0));

    counts.forEach((count, day) => {
      if(day === 0) {
        next[6] = count;
        next[8] = count;
      }
      else {
        next[day-1] += count;
      }
    });

    counts = next;
  });

  const length = dayKeys
    .map(k => counts[k])
    .reduce((a, b) => a + b);

  return length;
};

export const solve = solve2;
