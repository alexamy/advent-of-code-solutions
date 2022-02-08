import fs from 'fs';
import _ from 'lodash';

const producer = (n: number) => n === 0 ? [6,8] : [n-1];

export const readInput = async () => (await fs.promises.readFile('./input.txt')).toString();

export const solve1 = (initial: string, day: number) => _
  .range(day)
  .reduce((days) => days.flatMap(producer), initial.trim().split(',').map(Number))
  .length;

export const solve2 = (data: string, days: number) => {
  const dayKeys = _.range(9);
  const zeroDays = dayKeys.map(_.constant(0));

  const countsStart = data
    .trim().split(',').map(Number)
    .reduce((acc, k) => { acc[k] += 1; return acc; }, [...zeroDays]);

  const counts = _.range(days).reduce(counts => {
    const next: number[] = [...zeroDays];

    counts.forEach((count, day) => {
      if(day === 0) {
        next[6] = count;
        next[8] = count;
      }
      else {
        next[day-1] += count;
      }
    });

    return next;
  }, countsStart);

  const length = dayKeys.map(k => counts[k]).reduce((a, b) => a + b);

  return length;
};

export const solve = solve2;
