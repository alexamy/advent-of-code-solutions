import fs from 'fs';
import _ from 'lodash';

type Solver = (data: string) => number;

type Point = [number, number];

const makePath = (start: Point, end: Point): Point[] => {
  const [x1, y1] = start;
  const [x2, y2] = end;

  const x = x1 === x2 ? x1 : null;
  const y = y1 === y2 ? y1 : null;

  if(x) {
    const ymin = Math.min(y1, y2);
    const ymax = Math.max(y1, y2);

    return _.range(ymin, ymax + 1).map(y => [x,y]);
  }

  if(y) {
    const xmin = Math.min(x1, x2);
    const xmax = Math.max(x1, x2);

    return _.range(xmin, xmax + 1).map(x => [x,y]);
  }

  return [[0,0]];
}

export const readInput = async () => (await fs.promises.readFile('./input.txt')).toString();

export const solve1: Solver = (data) => {
  const pairs = data.trim().split('\n')
    .map(row => row.split(' -> '))
    .map(pair => pair.map(coords => coords.split(',').map(Number)))
    .filter(([start, end]) => start[0] === end[0] || start[1] === end[1])
    .flatMap(([start, end]) => makePath(start as Point, end as Point));

  const count = _(pairs)
    .countBy()
    .toPairs()
    .filter(([_, count]) => count > 1)
    .value()
    .length;

  return count;
};

export const solve2: Solver = (data) => {
  return 0;
};
