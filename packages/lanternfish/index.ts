import fs from 'fs';
import _ from 'lodash';
import r, { inc } from 'ramda';

export const readInput = async () => (await fs.promises.readFile('./input.txt')).toString();

const producer = (n: number) => n === 0 ? [6,8] : [n-1];

export const solve1 = (initial: string, day: number) => _
  .range(day)
  .reduce((days) => days.flatMap(producer), initial.trim().split(',').map(Number))
  .length;

export const solve2 = (data: string, days: number) => {
  const log = r.tap(console.log);

  const countsStart: Record<string, number> = r.pipe(
    r.trim,
    r.split(','),
    r.map(Number),
    r.map(r.flip(r.objOf)(1)),
    r.reduce(r.mergeWith(r.add), {}),
  )(data);

  const countReducer = (counts: Record<string, number>) => {
    const pairs = r.toPairs(counts);

    const ps = pairs.map(([dayStr, count]) => {
      const day = Number(dayStr);
      return day === 0 ? { 6: count, 8: count } : { [day-1]: count };
    });

    return r.reduce(r.mergeWith(r.add), {})(ps);
  }

  const length = r.pipe(
    r.range(0),
    r.reduce(countReducer, countsStart),
    r.toPairs,
    r.map<number[], number>(r.view(r.lensIndex(1))),
    r.sum
  )(days);

  return length;
};

export const solve = solve2;
