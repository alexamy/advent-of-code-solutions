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
    const mapper = r.pipe(
      r.unapply(r.identity),
      r.ifElse(
        r.propEq(1, '0'),
        r.pipe(r.prop('0'), r.converge(r.mergeLeft, [r.objOf('6'), r.objOf('8')])),
        ([count, day]) => ({ [+day-1]: count })),
    )


    return r.pipe(
      r.mapObjIndexed(mapper),
      // log,
      r.values,
      r.reduce(r.mergeWith(r.add), {})
    )(counts);
  }

  const length: number = r.pipe(
    r.range(0),
    r.reduce(countReducer, countsStart),
    r.toPairs,
    r.map<number[], number>(r.view(r.lensIndex(1))),
    r.sum
  )(days);

  return length;
};

export const solve = solve2;
