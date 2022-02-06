import fs from 'fs';
import _ from 'lodash';

type Solver = (data: string) => number;

type Point = number[];

const makeHorizontalPath = (start: Point, end: Point): Point[] => {
  const [x1, y1] = start;
  const [x2, _y2] = end;

  const xmin = Math.min(x1, x2);
  const xmax = Math.max(x1, x2);

  return _.range(xmin, xmax + 1).map(x => [x,y1]);
}

const makeVerticalPath = (start: Point, end: Point): Point[] => {
  const [x1, y1] = start;
  const [_x2, y2] = end;

  const ymin = Math.min(y1, y2);
  const ymax = Math.max(y1, y2);

  return _.range(ymin, ymax + 1).map(y => [x1,y]);
}

export const readInput = async () => (await fs.promises.readFile('./input.txt')).toString();

export const solve1: Solver = (data) => {
  const isVertical = (start: number[], end: number[]) => start[0] === end[0];
  const isHorizontal = (start: number[], end: number[]) => start[1] === end[1];

  const pairs = data
    .trim()
    .split('\n')
    .map(row => row.split(' -> '))
    .map(pair => pair.map(coords => coords.split(',').map(Number)));

  const horizontalPathData = pairs
    .filter(([start, end]) => isHorizontal(start, end))
    .flatMap(([start, end]) => makeHorizontalPath(start, end));

  const verticalPathData = pairs
    .filter(([start, end]) => isVertical(start, end))
    .flatMap(([start, end]) => makeVerticalPath(start, end));

  const pathData = horizontalPathData.concat(verticalPathData).flat(0);

  const count = _(pathData)
    .countBy()
    .values()
    .filter(count => count > 1)
    .value()
    .length;

  return count;
};

export const solve2: Solver = (data) => {
  return 0;
};
