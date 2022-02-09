import fs from 'fs';
import _ from 'lodash';

const producer = (n: number) => n === 0 ? [6,8] : [n-1];

export const readInput = async () => (await fs.promises.readFile('./input.txt')).toString();

export const solve1 = (initial: string, day: number) => _
  .range(day)
  .reduce((days) => days.flatMap(producer), initial.trim().split(',').map(Number))
  .length;

export const solve2 = (data: string, days: number) => {
  const safeSum = (a: number, b: number) => isFinite(a + b) ? (a + b) : undefined;
  const sumDays = (xs: Record<string, number>[]) => _.mergeWith({}, ...xs, safeSum)

  const dayInit = (k: string) => ({ [k]: 1 });
  const nextDay = (count: number, day: string): Record<string, number> =>
    +day === 0
      ? { 6: count, 8: count }
      : { [+day-1]: count };

  const start: Record<string, number> =
    _(data)
    .thru(s => s.trim().split(',').map(dayInit))
    .thru(sumDays)
    .value();

  const dayIteratee = (counts: Record<string, number>) =>
    _(counts)
    .mapValues<Record<string, number>>(nextDay)
    .values()
    .thru(sumDays)
    .value();

  const count = _
    .chain(days)
    .range()
    .reduce(dayIteratee, start)
    .values()
    .sum()
    .value();

  return count;
};

export const solve = solve2;
