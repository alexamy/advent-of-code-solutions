import fs from 'fs';
import _ from 'lodash';
import R from 'ramda';

export const readInput = async () => (await fs.promises.readFile('./input.txt')).toString();

const producer = (n: number) => n === 0 ? [6,8] : [n-1];

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
  const addReducer = (acc: number[], v: number) =>
    R.over(R.lensIndex(v), R.pipe(R.defaultTo(0), R.inc), acc);

  const countsStart = R.pipe(
    R.trim,
    R.split(','),
    R.map(Number),
    R.reduce(addReducer, R.repeat(0, 8))
  )(data);

  const counts = [...Array(days).keys()]
    .reduce(counts => {
      const next = Array(counts.length).fill(0);
      counts.forEach(transformer(next));
      return next;
    }, countsStart);

  const length = [...Array(counts.length).keys()]
    .map(k => counts[k])
    .reduce((a, b) => a + b);

  return length;
};

export const solve = solve2;
