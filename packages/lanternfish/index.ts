import fs from 'fs';
import _ from 'lodash';
import r, { inc } from 'ramda';

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
  const log = r.tap(console.log);

  const countsStart = r.pipe(
    r.trim,
    r.split(','),
    r.map(Number),
    //@ts-ignore
    r.map(r.objOf(r.__, 1)),
    r.reduce(r.mergeWith(r.add), []),
  )(data);

  const countReducer = (counts: number[]) => {
    const next = Array(counts.length).fill(0);
    counts.forEach(transformer(next));
    return next;
  }

  const length = r.pipe(
    r.range(0),
    r.reduce(countReducer, countsStart),
    r.sum
  )(days);

  return length;
};

export const solve = solve2;
