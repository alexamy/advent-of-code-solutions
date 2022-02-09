import fs from 'fs';
import _, { isNumber } from 'lodash';

const producer = (n: number) => n === 0 ? [6,8] : [n-1];

export const readInput = async () => (await fs.promises.readFile('./input.txt')).toString();

export const solve1 = (initial: string, day: number) => _
  .range(day)
  .reduce((days) => days.flatMap(producer), initial.trim().split(',').map(Number))
  .length;

export const solve2 = (data: string, days: number) => {
  const safeSum = (a: number, b: number) => isFinite(a + b) ? (a + b) : undefined;
  const dayInit = (num: number) => ({ [num]: 1 });
  const nextDay = (count: number, day: number) =>
    +day === 0
      ? { 6: count, 8: count }
      : { [+day-1]: count };

  const dayObjects = data.trim().split(',').map(Number).map(dayInit);
  const countsStart = _.mergeWith({}, ...dayObjects, safeSum);

  const counts = _.range(days)
    .reduce(counts => {
      const values = _.mapValues(counts, nextDay);
      return _.mergeWith({}, ..._.values(values), safeSum);
    }, countsStart);

  const length = _.values(counts).reduce(safeSum);

  return length;
};

export const solve = solve2;
