import fs from 'fs';
import _ from 'lodash';

const producer = (n: number) => n === 0 ? [6,8] : [n-1];

export const readInput = async () => (await fs.promises.readFile('./input.txt')).toString();

export const solve1 = (initial: string, day: number) => _
  .range(day)
  .reduce((days) => days.flatMap(producer), initial.trim().split(',').map(Number))
  .length;

const transformer = (next: number[]) => (count: number, day: number) => {
  if(day === 0) {
    next[6] = count;
    next[8] = count;
  }
  else {
    next[day-1] = (next[day-1] ?? 0) + count;
  }
}

export const solve2 = (data: string, days: number) => {
  const countsStart = data
    .trim().split(',').map(Number)
    .reduce((acc, k) => {
      acc[k] = (acc[k] ?? 0) + 1;
      return acc;
    }, [] as number[]);

  const counts = _.range(days).reduce(counts => {
    const next = Array(counts.length).fill(0);
    counts.forEach(transformer(next));
    return next;
  }, countsStart);

  const length = _
    .range(counts.length)
    .map(k => counts[k])
    .reduce((a, b) => a + b);

  return length;
};

export const solve = solve2;
